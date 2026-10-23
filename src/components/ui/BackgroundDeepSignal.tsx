"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import type {
  ComponentConfig,
  GpuShaderDefinition,
  NodeMetadata,
} from "shaders/core";
import preset from "./BackgroundDeepSignal.preset.json";

export interface BackgroundDeepSignalProps {
  className?: string;
  style?: CSSProperties;
  /** Background. Default: #080f1a. */
  background?: string;
  /** Background Accent. Default: #0b0b29. */
  backgroundAccent?: string;
  /** Glow Color. When omitted, preserves each blob's original highlight color. */
  glowColor?: string;
  /** Animation Speed, 0–5. Controls the Swirl layer, as on the source page. Default: 1. */
  animationSpeed?: number;
  /** Line Density, 0–5. Default: 1. */
  lineDensity?: number;
  /** Twirl Intensity, -5–5. Default: -1.7. */
  twirlIntensity?: number;
  /** Wave Distortion, 0–1. Default: 0.1. */
  waveDistortion?: number;
  /** Wave Frequency, 0.1–10. Default: 2.9. */
  waveFrequency?: number;
  /** Glow Size, 0–2. When omitted, preserves the original sizes (0.8 and 0.5). */
  glowSize?: number;
  /** Glow Intensity, 0–1. When omitted, preserves the original intensities (0.6 and 0.5). */
  glowIntensity?: number;
  /** Film Grain, 0–1. Default: 0.05. */
  filmGrain?: number;
}

type Configuration = Omit<BackgroundDeepSignalProps, "className" | "style">;
type Renderer = ReturnType<typeof import("shaders/core").shaderRendererGPU>;

const SWIRL = "idmkodks11y2rdsdyh5";
const WAVE = "idmkodlv4g4nvuly2oq";
const BLOBS = ["idmkodku8qfbdjjwucv", "idmkoegq1txwbqkhmcl"];

// These are the exact key_prop targets and ranges exposed by the source page.
const CONTROLS: Record<
  keyof Configuration,
  { prop: string; targets: string[]; range?: [number, number] }
> = {
  background: { prop: "colorA", targets: [SWIRL] },
  backgroundAccent: { prop: "colorB", targets: [SWIRL] },
  glowColor: { prop: "highlightColor", targets: BLOBS },
  animationSpeed: { prop: "speed", targets: [SWIRL], range: [0, 5] },
  lineDensity: { prop: "detail", targets: [SWIRL], range: [0, 5] },
  twirlIntensity: {
    prop: "intensity",
    targets: ["idmkoek2ouxt92pjnqo"],
    range: [-5, 5],
  },
  waveDistortion: { prop: "strength", targets: [WAVE], range: [0, 1] },
  waveFrequency: { prop: "frequency", targets: [WAVE], range: [0.1, 10] },
  glowSize: { prop: "size", targets: BLOBS, range: [0, 2] },
  glowIntensity: { prop: "highlightIntensity", targets: BLOBS, range: [0, 1] },
  filmGrain: {
    prop: "strength",
    targets: ["idmkodod3yz92eg11ii"],
    range: [0, 1],
  },
};

/**
 * @example
 * <section className="relative min-h-[480px]">
 *   <BackgroundDeepSignal glowColor="#705bff" twirlIntensity={-2} />
 *   <div className="relative">Your content</div>
 * </section>
 */
export function BackgroundDeepSignal({
  className,
  style,
  background,
  backgroundAccent,
  glowColor,
  animationSpeed,
  lineDensity,
  twirlIntensity,
  waveDistortion,
  waveFrequency,
  glowSize,
  glowIntensity,
  filmGrain,
}: BackgroundDeepSignalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<(() => void) | null>(null);
  const configuration = useMemo<Configuration>(
    () => ({
      background,
      backgroundAccent,
      glowColor,
      animationSpeed,
      lineDensity,
      twirlIntensity,
      waveDistortion,
      waveFrequency,
      glowSize,
      glowIntensity,
      filmGrain,
    }),
    [
      background,
      backgroundAccent,
      glowColor,
      animationSpeed,
      lineDensity,
      twirlIntensity,
      waveDistortion,
      waveFrequency,
      glowSize,
      glowIntensity,
      filmGrain,
    ],
  );
  const configurationRef = useRef(configuration);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.dataset.shaderState = "loading";

    let renderer: Renderer | null = null;
    let disposed = false;
    let failed = false;
    let ready = false;
    let visible = true;
    let hasSize = false;
    let drawing = false;
    let dirty = true;
    let frame: number | null = null;
    let previousTime: number | null = null;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const originals = new Map<string, Record<string, unknown>>();

    const canDraw = () =>
      ready && !disposed && !failed && visible && hasSize && !document.hidden;

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    };

    const schedule = () => {
      if (canDraw() && !drawing && frame === null) {
        frame = requestAnimationFrame(draw);
      }
    };

    const draw = async (now: number) => {
      frame = null;
      if (!canDraw() || !renderer) return;
      const delta =
        !motion.matches && previousTime !== null
          ? Math.min((now - previousTime) / 1000, 0.1)
          : 0;
      previousTime = motion.matches ? null : now;
      dirty = false;
      drawing = true;
      try {
        await renderer.renderSyntheticFrame(delta, { waitForGpu: false });
        if (canDraw()) canvas.style.opacity = "1";
      } catch (error) {
        if (!disposed) {
          failed = true;
          canvas.style.opacity = "0";
          canvas.dataset.shaderState = "render-error";
          console.error("BackgroundDeepSignal: shader rendering failed", error);
        }
      } finally {
        drawing = false;
      }
      if (dirty || !motion.matches) schedule();
    };

    const refresh = () => {
      stop();
      dirty = true;
      schedule();
    };

    const applyConfiguration = () => {
      if (!ready || !renderer || disposed || failed) return;
      for (const key of Object.keys(CONTROLS) as (keyof Configuration)[]) {
        const { prop, targets, range } = CONTROLS[key];
        let value = configurationRef.current[key];
        if (typeof value === "number" && range) {
          value = Number.isFinite(value)
            ? Math.min(range[1], Math.max(range[0], value))
            : undefined;
        }
        for (const id of targets) {
          // Omitting a prop restores each target's authored value independently.
          renderer.updateUniformValue(
            id,
            prop,
            value ?? originals.get(id)?.[prop],
          );
        }
      }
      refresh();
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      hasSize = width > 0 && height > 0;
      if (ready && hasSize) renderer?.resize(width, height);
      refresh();
    };

    const initialize = async () => {
      try {
        const [core, swirl, wave, blob, grain, twirl] = await Promise.all([
          import("shaders/core"),
          import("shaders/core/Swirl"),
          import("shaders/core/WaveDistortion"),
          import("shaders/core/Blob"),
          import("shaders/core/FilmGrain"),
          import("shaders/core/Twirl"),
        ]);
        if (disposed) return;
        const activeRenderer = core.shaderRendererGPU();
        renderer = activeRenderer;
        activeRenderer.setFrameLocked(true);
        activeRenderer.setOnUnavailable((reason) => {
          failed = true;
          stop();
          canvas.style.opacity = "0";
          canvas.dataset.shaderState = reason;
        });
        await activeRenderer.initialize({
          canvas,
          observeElement: false,
          colorSpace: "p3-linear",
          toneMapping: "linear",
        });
        if (disposed) {
          activeRenderer.cleanup();
          return;
        }
        if (failed) return;

        const definitions: Record<string, GpuShaderDefinition> = {
          Swirl: swirl.default,
          WaveDistortion: wave.default,
          Blob: blob.default,
          FilmGrain: grain.default,
          Twirl: twirl.default,
        };
        const rootId = "deep-signal-root";
        activeRenderer.registerNode(
          rootId,
          core.rootPassthrough.fragment,
          null,
          null,
          {},
          core.rootPassthrough,
        );

        const register = (
          node: ComponentConfig,
          parentId: string,
          index: number,
        ) => {
          const definition = definitions[node.type];
          const id = node.id!;
          const props = node.props ?? {};
          originals.set(id, props);
          const values = Object.fromEntries(
            Object.entries(definition.props).map(([key, config]) => [
              key,
              props[key] !== undefined ? props[key] : config.default,
            ]),
          );
          const metadata: NodeMetadata = {
            id,
            renderOrder: index,
            blendMode: props.blendMode,
            opacity: props.opacity,
            transform: props.transform,
          };
          activeRenderer.registerNode(
            id,
            definition.fragment,
            parentId,
            metadata,
            core.createGpuUniformsMap(definition, values, id),
            definition,
          );
          node.children?.forEach((child, index) => register(child, id, index));
        };
        preset.components.forEach((node, index) =>
          register(node, rootId, index),
        );
        ready = true;
        canvas.dataset.shaderState = "ready";
        updateRef.current = applyConfiguration;
        applyConfiguration();
        resize();
      } catch (error) {
        if (!disposed) {
          failed = true;
          stop();
          canvas.style.opacity = "0";
          canvas.dataset.shaderState = "initialization-error";
          renderer?.cleanup();
          console.error(
            "BackgroundDeepSignal: shader initialization failed",
            error,
          );
        }
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", refresh);
    void initialize();

    return () => {
      disposed = true;
      stop();
      updateRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", refresh);
      motion.removeEventListener("change", refresh);
      renderer?.cleanup();
    };
  }, []);

  useEffect(() => {
    configurationRef.current = configuration;
    updateRef.current?.();
  }, [configuration]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: background ?? "#080f1a",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", opacity: 0 }}
      />
    </div>
  );
}

export default BackgroundDeepSignal;
