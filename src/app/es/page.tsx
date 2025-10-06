"use client";

import "./ai-globals.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { openInStudioViaProxy } from "../ai/util";
import HeaderStandalone from "./header";
import FooterStandalone from "./footer";
import { useSpeechToText } from "../ai/useSpeechToText";

import {
  mdiAccount,
  mdiAccountHeart,
  mdiAirplaneLanding,
  mdiCalendarStar,
  mdiContentCopy,
  mdiEmail,
  mdiGiftOutline,
  mdiMicrophone,
  mdiMicrophoneOff,
  mdiSend,
  mdiWeb,
} from "@mdi/js";
import Icon from "@mdi/react";

type ProjectType = "web" | "email";

const headlineTexts = [
  "equipo de marketing",
  "constructor de sitios web",
  "yo futuro",
  "administrador de tienda web",
  "oficial digital",
  "gente de producto",
  "cofundador",
  "desarrolladores",
  "diseñadores"
];

export default function AiPage() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("web");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const speechToText = useSpeechToText();
  const { isListening, transcript } = speechToText;

  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    const urlProjectType = searchParams.get("projectType");

    if (urlPrompt) {
      setPrompt(decodeURIComponent(urlPrompt));
    }

    if (
      urlProjectType &&
      (urlProjectType === "web" || urlProjectType === "email")
    ) {
      setProjectType(urlProjectType);
    }
  }, [searchParams]);

  // Update prompt when speech-to-text transcript changes
  useEffect(() => {
    transcript && setPrompt(transcript);
  }, [transcript]);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      openInStudioViaProxy(prompt, projectType);
    } catch (e) {
      const message = e instanceof Error ? e.message : "La solicitud falló";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isEmail = projectType === "email";

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <HeaderStandalone />

      <main className="relative">
        <div
          className="relative w-full bg-fixed bg-no-repeat bg-cover pt-32 pb-48"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,1) 100%)",
          }}
        >
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <SpinningOrbInline className="w-full h-full opacity-90" />
          </div>

          <div className="relative" style={{ zIndex: 10 }}>
            <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
              <div className="text-center mb-14">
                <h1 className="text-4xl sm:text-6xl mt-4 text-white">
                  Crea hermosos {isEmail ? "emails" : "sitios web"} con IA
                </h1>
                <h2 className="text-xl sm:text-2xl mt-4 text-white">
                  Con edición de arrastrar y soltar y salida HTML
                </h2>
                <h3 className="text-lg sm:text-xl mt-4 text-white opacity-70">
                  Tus <RotatingText texts={headlineTexts} /> te amarán
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div
                  className={cn(
                    "rounded-3xl py-2 backdrop-blur-sm border border-zinc-700/50",
                    "bg-zinc-900/50 text-gray-400 text-sm",
                    "flex flex-wrap mx-2 sm:mx-0"
                  )}
                >
                  <div className="w-full">
                    <textarea
                      value={prompt}
                      onChange={(e) =>
                        setPrompt((e.target.value || "").slice(0, 3500))
                      }
                      className={cn(
                        "w-full resize-none bg-transparent border-0 outline-none",
                        "placeholder:text-neutral-500 text-gray-400",
                        "focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none",
                        "mx-2 mt-1 mb-2 p-2 text-lg leading-7 min-h-[60px]",
                        "box-border border-solid border-current",
                        "font-inherit font-feature-inherit font-variation-inherit",
                        "font-inherit tracking-inherit text-inherit",
                        "outline-2 outline-transparent outline-offset-2"
                      )}
                      style={{
                        WebkitTextSizeAdjust: "100%",
                        tabSize: 4,
                        WebkitTapHighlightColor: "transparent",
                      }}
                      placeholder={
                        isEmail
                          ? "Pide a la IA que cree un email para..."
                          : "Crea un sitio web basado en https://tu-sitio-web-antiguo.org"
                      }
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="w-full px-4 pb-2 flex items-center justify-between">
                    <TabsStandalone
                      value={projectType}
                      onChange={setProjectType}
                    />
                    <div className="flex gap-3 items-center">
                      {/* Speech-to-text mic button */}
                      {speechToText.isSupported && (
                        <button
                          type="button"
                          onClick={
                            isListening ? speechToText.stop : speechToText.start
                          }
                          className={cn(
                            "flex items-center justify-center rounded-full p-2 transition-colors",
                            "hover:opacity-90",
                            isListening
                              ? "bg-red-500 text-white"
                              : "text-white/60 hover:text-white/80"
                          )}
                          aria-label={
                            isListening ? "Dejar de escuchar" : "Comenzar entrada de voz"
                          }
                          title={
                            isListening ? "Dejar de escuchar" : "Comenzar entrada de voz"
                          }
                        >
                          <Icon
                            path={
                              isListening ? mdiMicrophoneOff : mdiMicrophone
                            }
                            size={1.2}
                          />
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className={cn(
                          "flex items-center justify-center rounded-full p-2",
                          "bg-violet-600 text-white hover:opacity-90",
                          loading && "opacity-50"
                        )}
                        aria-label="Enviar"
                      >
                        {loading ? (
                          <span className="px-2">Enviando...</span>
                        ) : (
                          <Icon path={mdiSend} size={1.2} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-6 flex gap-3 justify-center flex-wrap px-2 sm:px-0">
                <RecommendationsStandalone
                  data={isEmail ? recommendationsEmail : recommendationsWeb}
                  onClick={(p) => setPrompt(p)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterStandalone />

      {error && (
        <p className="mt-4 text-center text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

function RotatingText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const cls = cn(
    "inline-block transition-all duration-300 ease-in-out",
    isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"
  );

  return <span className={cls}>{texts[currentIndex]}</span>;
}

function SpinningOrbInline({ className }: { className?: string }) {
  const css = `
  @keyframes aurora-rotate { 0% { transform: translate(-50%, -50%) rotate(0deg);} 100% { transform: translate(-50%, -50%) rotate(360deg);} }
  @keyframes aurora-counter-rotate { 0% { transform: translate(-50%, -50%) rotate(360deg);} 100% { transform: translate(-50%, -50%) rotate(0deg);} }
  @keyframes aurora-pulse { 0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1);} 50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2);} }
  .auroraContainer{ animation: aurora-rotate 20s linear infinite; }
  .auroraInnerContainer{ animation: aurora-counter-rotate 15s linear infinite; }
  .auroraGlow{ animation: aurora-pulse 8s ease-in-out infinite; }
  `;

  return (
    <div className={cn(className, "relative w-full h-full overflow-hidden")}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={cn(
          "auroraContainer",
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-[350px] h-[350px] origin-center"
        )}
      >
        <div
          className="absolute top-[5px] left-0 w-[350px] h-[170px] blur-[25px]"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(124, 58, 237, 1) 0%, rgba(147, 51, 234, 0.8) 25%, rgba(168, 85, 247, 0.6) 50%, rgba(192, 132, 252, 0.4) 70%, transparent 85%)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />

        <div
          className="absolute bottom-[5px] left-0 w-[350px] h-[170px] blur-[25px]"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(168, 85, 247, 1) 0%, rgba(192, 132, 252, 0.8) 25%, rgba(217, 70, 239, 0.6) 50%, rgba(236, 72, 153, 0.4) 70%, transparent 85%)",
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          }}
        />
      </div>

      <div
        className={cn(
          "auroraInnerContainer",
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-[250px] h-[250px] origin-center"
        )}
      >
        <div
          className="absolute top-[5px] left-0 w-[250px] h-[120px] blur-[20px]"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(124, 58, 237, 0.8) 0%, rgba(147, 51, 234, 0.6) 25%, rgba(168, 85, 247, 0.4) 50%, rgba(192, 132, 252, 0.2) 70%, transparent 85%)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />

        <div
          className="absolute bottom-[5px] left-0 w-[250px] h-[120px] blur-[20px]"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(168, 85, 247, 0.8) 0%, rgba(192, 132, 252, 0.6) 25%, rgba(217, 70, 239, 0.4) 50%, rgba(236, 72, 153, 0.2) 70%, transparent 85%)",
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          }}
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[100px] rounded-full blur-[10px] z-10"
        style={{
          background:
            "radial-gradient(ellipse, transparent 0%, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      <div
        className={cn(
          "auroraGlow",
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "w-[1000px] h-[500px] blur-[50px]"
        )}
        style={{
          background:
            "radial-gradient(ellipse, rgba(147, 51, 234, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}

function TabsStandalone({
  value,
  onChange,
}: {
  value: ProjectType;
  onChange: (v: ProjectType) => void;
}) {
  return (
    <div className="flex gap-1 bg-white/5 rounded-full p-1">
      {(
        [
          { id: "web", label: "Web", icon: mdiWeb },
          { id: "email", label: "Email", icon: mdiEmail },
        ] as const
      ).map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "w-20 px-2 py-1.5 rounded-full text-sm flex items-center gap-2",
            value === tab.id
              ? "bg-gray-200 text-violet-600"
              : "text-white/80 hover:text-white"
          )}
        >
          <Icon path={tab.icon} size={0.8} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

type RecommendationItem = { label: string; prompt: string; icon: string };

const recommendationsWeb: RecommendationItem[] = [
  {
    icon: mdiContentCopy,
    label: "Clonar un sitio web",
    prompt: "Copia este sitio web para mí: https://wordpress.org",
  },
  {
    icon: mdiAccount,
    label: "Sitio Web Personal",
    prompt:
      "Crea un sitio web personal con secciones sobre mí, proyectos, habilidades y contacto.",
  },
  {
    icon: mdiAirplaneLanding,
    label: "Página de Aterrizaje de Nuevo Producto",
    prompt:
      "Crea una página de aterrizaje para un nuevo producto con una sección hero, servicios, testimonios y formulario de contacto.",
  },
];

const recommendationsEmail: RecommendationItem[] = [
  {
    icon: mdiGiftOutline,
    label: "Oferta Promocional",
    prompt:
      "Crea un email promocional con una oferta de descuento, banner llamativo, detalles de la oferta y un botón para comprar ahora.",
  },
  {
    icon: mdiCalendarStar,
    label: "Invitación a Evento",
    prompt:
      "Diseña un boletín invitando a los usuarios a un evento próximo, con fecha, ubicación, botón RSVP y destacados de la agenda.",
  },
  {
    icon: mdiAccountHeart,
    label: "Email de Bienvenida",
    prompt:
      "Diseña un email de bienvenida amigable para nuevos suscriptores, con un mensaje de agradecimiento, qué esperar y enlaces útiles para comenzar.",
  },
];

function RecommendationsStandalone({
  onClick,
  data,
}: {
  onClick: (prompt: string) => void;
  data: RecommendationItem[];
}) {
  return (
    <>
      {data.map((button, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "rounded-full px-4 py-2 text-sm border border-white/20 hover:border-violet-400",
            "text-gray-400 hover:text-white flex items-center gap-2"
          )}
          onClick={() => onClick(button.prompt)}
        >
          <Icon path={button.icon} size={0.8} />
          {button.label}
        </button>
      ))}
    </>
  );
}
