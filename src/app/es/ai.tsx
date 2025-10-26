"use client";

import cn from "classnames";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSpeechToText } from "../ai/useSpeechToText";
import { openInStudioViaProxy } from "../ai/util";
import FooterStandalone from "./footer";
import HeaderStandalone from "./header";
import { TemplateGallery } from "../_components/TemplateGallery";

// PostHog tracking function
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
    };
  }
}

function trackClientJourneyEvent(event: string, properties: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties);
  }
}

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
  "equipo de desarrollo",
  "equipo de diseño",
];

export default function AiPage() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("web");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTrackedInterest, setHasTrackedInterest] = useState(false);
  const speechToText = useSpeechToText();
  const { isListening, transcript } = speechToText;
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showButtonHighlight, setShowButtonHighlight] = useState(false);

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

  // Track homepage landing
  useEffect(() => {
    trackClientJourneyEvent('homepage_landed', {
      page: window.location.pathname,
      source: 'landing_page'
    });
  }, []);

  // Highlight animation on page load
  useEffect(() => {
    // Textarea: Wait 1 second before starting the animation
    const textareaStartTimer = setTimeout(() => {
      setShowHighlight(true);
    }, 1000);

    // Textarea: Turn off highlight after animation completes (1s delay + 3s animation)
    const textareaEndTimer = setTimeout(() => {
      setShowHighlight(false);
    }, 4000);

    // Button: Start after textarea ends, with a 3s pause
    const buttonStartTimer = setTimeout(() => {
      setShowButtonHighlight(true);
    }, 7000);

    // Button: Turn off after 1 pulse (1.5s animation)
    const buttonEndTimer = setTimeout(() => {
      setShowButtonHighlight(false);
    }, 8500);

    return () => {
      clearTimeout(textareaStartTimer);
      clearTimeout(textareaEndTimer);
      clearTimeout(buttonStartTimer);
      clearTimeout(buttonEndTimer);
    };
  }, []);

  // Update prompt when speech-to-text transcript changes
  useEffect(() => {
    transcript && setPrompt(transcript);
  }, [transcript]);

  // Track AI interest when user starts typing
  useEffect(() => {
    if (prompt.length > 0 && !hasTrackedInterest) {
      trackClientJourneyEvent('ai_interest_shown', {
        page: window.location.pathname,
        source: 'landing_page'
      });
      setHasTrackedInterest(true);
    }
  }, [prompt, hasTrackedInterest]);

  // Typing/deleting animation for placeholder
  useEffect(() => {
    const inputTexts = [
      "equipo de marketing para amar...",
      "próximo lanzamiento de producto...",
      "campaña de ventas próxima...",
      "rediseño de tienda online...",
      "anuncio de producto SaaS...",
      "proyecto de transformación digital...",
      "próximo cliente de la agencia...",
      "plataforma de comunidad de desarrolladores...",
      "vitrina de portafolio creativo...",
      "basado en https://mi-sitio-viejo.com...",
    ];

    const currentText = inputTexts[currentHeadlineIndex];

    const typingSpeed = isDeleting ? 15 : 50;
    const pauseBeforeDelete = 1200;
    const pauseBeforeType = 250;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentHeadlineIndex((prev) => (prev + 1) % inputTexts.length);
        setTimeout(() => {}, pauseBeforeType);
      } else if (isDeleting) {
        setTypedText(currentText.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentText.substring(0, typedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentHeadlineIndex]);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!prompt.trim()) return;

    // Track that signin is required when user submits
    trackClientJourneyEvent('ai_signin_required', {
      page: window.location.pathname,
      prompt_length: prompt.length
    });

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes borderPulse {
              0%, 100% { 
                border-color: rgba(139, 92, 246, 0.3);
                box-shadow: 0 0 0 rgba(139, 92, 246, 0);
              }
              50% { 
                border-color: rgba(139, 92, 246, 1);
                box-shadow: 0 0 25px rgba(139, 92, 246, 0.5);
              }
            }
          `,
        }}
      />
      <HeaderStandalone />

      <main className="relative">
        <div
          className="relative w-full bg-fixed bg-no-repeat bg-cover py-32"
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
                <h1 className="text-4xl sm:text-6xl !font-semibold mt-4 text-white">
                  Crea hermosos
                  <span className="text-violet-400 italic !font-semibold mx-1">
                    {isEmail ? "emails" : "sitios web"}
                  </span>{" "}
                  con IA
                </h1>
                <h2 className="text-xl sm:text-2xl mt-6 text-gray-300 font-light">
                  Con edición drag & drop y salida HTML
                </h2>
                <h3 className="text-md sm:text-xl mt-4 text-gray-200 opacity-70">
                  Tu <RotatingText texts={headlineTexts} /> te amará
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div
                  className={cn(
                    "rounded-3xl py-2 backdrop-blur-sm border transition-all duration-500",
                    "bg-zinc-900/50 text-gray-400 text-sm",
                    "flex flex-wrap mx-2 sm:mx-0",
                    !showHighlight && "border-zinc-700/50"
                  )}
                  style={
                    showHighlight
                      ? {
                          borderColor: "rgba(139, 92, 246, 0.3)",
                          animation: "borderPulse 1.5s ease-in-out 2",
                        }
                      : undefined
                  }
                >
                  <div className="w-full">
                    <textarea
                      value={prompt}
                      onChange={(e) =>
                        setPrompt((e.target.value || "").slice(0, 3500))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (prompt.trim() && !loading) {
                            handleSubmit(e as any);
                          }
                        }
                      }}
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
                          ? `Vamos a crear un email para tu ${typedText}`
                          : `Vamos a crear un sitio web para tu ${typedText}`
                      }
                      required
                      disabled={loading}
                      autoFocus
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
                            isListening
                              ? "Dejar de escuchar"
                              : "Empezar a escuchar"
                          }
                          title={
                            isListening
                              ? "Dejar de escuchar"
                              : "Empezar a escuchar"
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
                        disabled={loading || !prompt.trim()}
                        className={cn(
                          "flex items-center justify-center rounded-full p-2",
                          "bg-violet-600 text-white transition-opacity",
                          !prompt.trim() &&
                            !loading &&
                            "opacity-30 cursor-not-allowed",
                          prompt.trim() && !loading && "hover:opacity-90",
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
                  showHighlight={showButtonHighlight}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <TemplateGallery defaultType={projectType} />
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
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, [texts.length]);

  const cls = cn(
    "inline-block transition-all duration-500 ease-in-out",
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
    label: "Sitio web personal",
    prompt:
      "Crea un sitio web personal con secciones sobre mí, proyectos, habilidades y contacto.",
  },
  {
    icon: mdiAirplaneLanding,
    label: "Landing page para tu nuevo producto",
    prompt:
      "Crea una landing page para un nuevo producto con una sección hero, servicios, testimonios y formulario de contacto.",
  },
];

const recommendationsEmail: RecommendationItem[] = [
  {
    icon: mdiGiftOutline,
    label: "Oferta promocional",
    prompt:
      "Crea un email promocional con una oferta de descuento, banner llamativo, detalles de la oferta y un botón para comprar ahora.",
  },
  {
    icon: mdiCalendarStar,
    label: "Invitación para un evento",
    prompt:
      "Diseña un boletín invitando a los usuarios a un evento próximo, con fecha, ubicación, botón RSVP y destacados de la agenda.",
  },
  {
    icon: mdiAccountHeart,
    label: "Email de bienvenida",
    prompt:
      "Diseña un email de bienvenida amigable para nuevos suscriptores, con un mensaje de agradecimiento, qué esperar y enlaces útiles para comenzar.",
  },
];

function RecommendationsStandalone({
  onClick,
  data,
  showHighlight,
}: {
  onClick: (prompt: string) => void;
  data: RecommendationItem[];
  showHighlight?: boolean;
}) {
  return (
    <>
      {data.map((button, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "rounded-full px-4 py-2 text-sm border hover:border-violet-400",
            "text-gray-400 hover:text-white flex items-center gap-2 transition-all duration-500",
            !(index === 0 && showHighlight) && "border-white/20"
          )}
          style={
            index === 0 && showHighlight
              ? {
                  borderColor: "rgba(139, 92, 246, 0.3)",
                  animation: "borderPulse 1.5s ease-in-out 1",
                }
              : undefined
          }
          onClick={() => onClick(button.prompt)}
        >
          <Icon path={button.icon} size={0.8} />
          {button.label}
        </button>
      ))}
    </>
  );
}
