"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";

export interface BackgroundNorthernLightsProps {
  className?: string;
  style?: CSSProperties;
  /** Aurora Edge Color. Any canvas-compatible CSS color. Default: #8d54ff. */
  colorA?: string;
  /** Aurora Core Color. Default: #29ff8d. */
  colorB?: string;
  /** Aurora Tip Color. Default: #1122d9. */
  colorC?: string;
  /** Background Color. Default: #0b1329. */
  backgroundColor?: string;
  /** Aurora Brightness, 0–100. Default: 75. */
  intensity?: number;
  /** Color Balance, 0–100. Default: 73. */
  balance?: number;
  /** Curtain Layers, 1–4 (rounded to an integer). Default: 4. */
  curtainCount?: number;
  /** Waviness, 0–200. Default: 78. */
  waviness?: number;
  /** Aurora Height, 10–200. This controls the shader, not the element's CSS height. Default: 84. */
  height?: number;
  /** Ray Detail, 0–100. Default: 24. */
  rayDensity?: number;
  /** Animation Speed, -10–10; 0 freezes the animation. Default: 5.6. */
  speed?: number;
  /** Film Grain, 0–1. Default: 0.1. */
  filmGrain?: number;
}

type Settings = Required<
  Omit<BackgroundNorthernLightsProps, "className" | "style">
>;

const VERTEX_SHADER = `
  attribute vec2 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uBackgroundColor;
  uniform float uIntensity;
  uniform float uBalance;
  uniform float uCurtainCount;
  uniform float uWaviness;
  uniform float uHeight;
  uniform float uRayDensity;
  uniform float uFilmGrain;

  float hash(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec3 p) {
    vec3 cell = floor(p);
    vec3 f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(
      mix(mix(hash(cell), hash(cell + vec3(1, 0, 0)), f.x),
          mix(hash(cell + vec3(0, 1, 0)), hash(cell + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(cell + vec3(0, 0, 1)), hash(cell + vec3(1, 0, 1)), f.x),
          mix(hash(cell + vec3(0, 1, 1)), hash(cell + vec3(1, 1, 1)), f.x), f.y),
      f.z
    ) * 2.0 - 1.0;
  }

  float phase(float seed, float k, float scale) {
    return fract(sin(seed * k) * scale) * 6.28318530718;
  }

  vec2 curtain(vec2 uv, float index, float offset) {
    float t = uTime * 0.06 + offset;
    float seed = index * 31.7;
    float x = (uv.x - 0.5) * (uResolution.x / uResolution.y) * 2.0;
    float wave = sin(x * 0.7 + t * 0.4 + phase(seed, 12.9, 4758.5)) * 0.15
      + sin(x * 1.6 + t * 0.65 + phase(seed, 78.2, 2847.1)) * 0.08
      + sin(x * 2.9 + t * 0.3 + phase(seed, 41.6, 1593.7)) * 0.04;
    float warp = noise(vec3(x * 0.5, t * 0.25, seed * 0.1));
    float path = 0.722 + (wave + warp * 0.14) * uWaviness;
    float rays = pow(sin((x + warp * 2.5) * mix(6.0, 20.0, uRayDensity) * 0.15
      + t * 0.1 + phase(seed, 53.7, 3847.2)) * 0.5 + 0.5, 1.5);
    float extent = uHeight * mix(0.4, 1.0, rays) * (rays * 0.4 + 0.6);
    float distance = uv.y - path;
    float envelope = smoothstep(-0.04, 0.015, distance)
      * (1.0 - smoothstep(0.0, extent, distance));
    float colorT = clamp(distance / (extent + 0.001), 0.0, 1.0);
    float section = mix(0.4, 1.0, warp * 0.5 + 0.5);
    float coreDistance = colorT - 0.2;
    float core = 1.0 + exp(-6.0 * coreDistance * coreDistance) * 0.3;
    return vec2(colorT, envelope * rays * section * core);
  }

  void main() {
    vec2 uv = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) / uResolution;
    float weightedHeight = 0.0;
    float total = 0.0;

    for (int i = 0; i < 4; i++) {
      if (float(i) >= uCurtainCount) break;
      float offset = i == 0 ? 0.0 : (i == 1 ? 3.1 : (i == 2 ? 6.7 : 9.4));
      float weight = i == 0 ? 1.0 : (i == 1 ? 0.65 : (i == 2 ? 0.45 : 0.3));
      vec2 layer = curtain(uv, float(i), offset);
      weightedHeight += layer.x * layer.y * weight;
      total += layer.y * weight;
    }

    float colorT = pow(weightedHeight / (total + 0.001), mix(2.5, 0.4, uBalance));
    vec3 aurora = mix(uColorA, uColorB, smoothstep(0.0, 0.2, colorT));
    aurora = mix(aurora, uColorC, smoothstep(0.4, 0.85, colorT));
    float backgroundShade = 0.55 + 0.45 * noise(vec3(uv * 2.0, uTime * 0.005));
    vec3 color = uBackgroundColor * backgroundShade + aurora * total * uIntensity;
    float grain = hash(vec3(gl_FragCoord.xy, mod(uTime, 100.0))) - 0.5;
    color += grain * uFilmGrain;
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

const clamp = (value: number, min: number, max: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

function createProgram(gl: WebGLRenderingContext) {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("BackgroundNorthernLights:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("BackgroundNorthernLights:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * Animated Northern Lights 1 background with the preview's 12 controls and defaults.
 * Place inside a positioned parent; it fills the parent without intercepting input.
 *
 * @example
 * <section className="relative min-h-[480px]">
 *   <BackgroundNorthernLights intensity={85} speed={3} filmGrain={0.05} />
 *   <div className="relative">Your content</div>
 * </section>
 */
export function BackgroundNorthernLights({
  className,
  style,
  colorA = "#8d54ff",
  colorB = "#29ff8d",
  colorC = "#1122d9",
  backgroundColor = "#0b1329",
  intensity = 75,
  balance = 73,
  curtainCount = 4,
  waviness = 78,
  height = 84,
  rayDensity = 24,
  speed = 5.6,
  filmGrain = 0.1,
}: BackgroundNorthernLightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateRef = useRef<((settings: Settings) => void) | null>(null);
  const settings = useMemo(
    () => ({
      colorA,
      colorB,
      colorC,
      backgroundColor,
      intensity: clamp(intensity, 0, 100, 75),
      balance: clamp(balance, 0, 100, 73),
      curtainCount: Math.round(clamp(curtainCount, 1, 4, 4)),
      waviness: clamp(waviness, 0, 200, 78),
      height: clamp(height, 10, 200, 84),
      rayDensity: clamp(rayDensity, 0, 100, 24),
      speed: clamp(speed, -10, 10, 5.6),
      filmGrain: clamp(filmGrain, 0, 1, 0.1),
    }),
    [
      colorA,
      colorB,
      colorC,
      backgroundColor,
      intensity,
      balance,
      curtainCount,
      waviness,
      height,
      rayDensity,
      speed,
      filmGrain,
    ],
  );
  const settingsRef = useRef(settings);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    // Resolve CSS colors once per prop change, rather than in the animation loop.
    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = colorCanvas.height = 1;
    const colorContext = colorCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const readColor = (color: string, fallback: string) => {
      if (!colorContext) return [0, 0, 0];
      colorContext.clearRect(0, 0, 1, 1);
      colorContext.fillStyle = fallback;
      colorContext.fillStyle = color;
      colorContext.fillRect(0, 0, 1, 1);
      return Array.from(colorContext.getImageData(0, 0, 1, 1).data)
        .slice(0, 3)
        .map((channel) => channel / 255);
    };

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let timeLocation: WebGLUniformLocation | null = null;
    let resolutionLocation: WebGLUniformLocation | null = null;
    let frame: number | null = null;
    let previousTime: number | null = null;
    let time = 0;
    let isIntersecting = true;
    let hasSize = false;
    let contextLost = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const maxSize = gl.getParameter(gl.MAX_VIEWPORT_DIMS) as Int32Array;

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    };

    const render = (now: number) => {
      frame = null;
      if (
        !program ||
        contextLost ||
        !hasSize ||
        !isIntersecting ||
        document.hidden
      ) {
        previousTime = null;
        return;
      }
      const animate = !motion.matches && settingsRef.current.speed !== 0;
      if (animate && previousTime !== null) {
        time +=
          Math.min((now - previousTime) / 1000, 0.1) *
          settingsRef.current.speed;
      }
      previousTime = animate ? now : null;
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
      if (animate) frame = requestAnimationFrame(render);
    };

    const refresh = () => {
      stop();
      render(performance.now());
    };

    const uploadSettings = (next: Settings) => {
      if (!program || contextLost) return;
      const currentProgram = program;
      gl.useProgram(currentProgram);
      const set = (name: string, value: number) =>
        gl.uniform1f(gl.getUniformLocation(currentProgram, name), value);
      const setColor = (name: string, color: string, fallback: string) =>
        gl.uniform3fv(
          gl.getUniformLocation(currentProgram, name),
          readColor(color, fallback),
        );
      setColor("uColorA", next.colorA, "#8d54ff");
      setColor("uColorB", next.colorB, "#29ff8d");
      setColor("uColorC", next.colorC, "#1122d9");
      setColor("uBackgroundColor", next.backgroundColor, "#0b1329");
      set("uIntensity", next.intensity * 0.018);
      set("uBalance", next.balance * 0.01);
      set("uCurtainCount", next.curtainCount);
      set("uWaviness", next.waviness * 0.01);
      set("uHeight", next.height * 0.01);
      set("uRayDensity", next.rayDensity * 0.01);
      set("uFilmGrain", next.filmGrain);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      hasSize = width > 0 && height > 0;
      // Cap both pixel density and total area for large backgrounds.
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(4_000_000 / Math.max(width * height, 1)),
        maxSize[0] / Math.max(width, 1),
        maxSize[1] / Math.max(height, 1),
      );
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (program && !contextLost) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
      refresh();
    };

    const initialize = () => {
      program = createProgram(gl);
      if (!program) return;
      buffer = gl.createBuffer();
      if (!buffer) {
        gl.deleteProgram(program);
        program = null;
        return;
      }
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      timeLocation = gl.getUniformLocation(program, "uTime");
      resolutionLocation = gl.getUniformLocation(program, "uResolution");
      uploadSettings(settingsRef.current);
      resize();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();
      canvas.style.opacity = "0";
    };
    const handleContextRestored = () => {
      contextLost = false;
      initialize();
    };

    updateRef.current = (next) => {
      uploadSettings(next);
      refresh();
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      refresh();
    });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", refresh);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    initialize();

    return () => {
      stop();
      updateRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", refresh);
      motion.removeEventListener("change", refresh);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    settingsRef.current = settings;
    updateRef.current?.(settings);
  }, [settings]);

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
        backgroundColor,
        backgroundImage: `radial-gradient(ellipse at 60% 100%, ${colorB}, transparent 65%), linear-gradient(160deg, ${backgroundColor} 40%, ${colorA} 75%, ${colorC})`,
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

export default BackgroundNorthernLights;
