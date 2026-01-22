"use client";

import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import HeaderStandalone from "./header";
import FooterStandalone from "./footer";
import { useSpeechToText } from "./useSpeechToText";
import { TemplateGallery } from "../_components/TemplateGallery";
import { useAuthContext } from "./AuthContext";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      flush?: () => void;
    };
  }
}

function trackClientJourneyEvent(
  event: string,
  properties: Record<string, any> = {}
) {
  if (typeof window !== "undefined" && window.posthog) {
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
  mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import { UploadMenu } from "./UploadMenu";
import { checkAuthSession, UserResponse } from "@/lib/grapes-api";
import { FileUploadType, FILE_TYPE_CONFIGS } from "./types";
import { openInStudio } from "./util";
import { useNewAuthFlow } from "@/lib/feature-flags";

type AiPageProps = {
  actionUrl?: string;
  className?: string;
  onPosted?: (data: unknown) => void;
};

type ProjectType = "web" | "email" | "all";

const headlineTexts = [
  "marketing team",
  "future self",
  "web-store admin",
  "digital officer",
  "product people",
  "co-founder",
  "developers",
  "designers",
];

const inputTexts = [
  "marketing team to love...",
  "next big product launch...",
  "upcoming sales campaign...",
  "e-commerce store redesign...",
  "SaaS product announcement...",
  "digital transformation project...",
  "agency's next client...",
  "developer community platform...",
  "creative portfolio showcase...",
  "based off https://my-old-website.com...",
];

export default function AiPage({ className }: AiPageProps) {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("web");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTrackedInterest, setHasTrackedInterest] = useState(false);
  const [showButtonHighlight, setShowButtonHighlight] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [autoSubmit, setAutoSubmit] = useState(false);

  const authContext = useAuthContext();
  const authSession = authContext?.authSession;
  const triggerAuth = authContext?.triggerAuth || (() => { });
  const useNewFlow = authContext?.useNewFlow || false;

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
    trackClientJourneyEvent("homepage_landed", {
      page: window.location.pathname,
      source: "landing_page",
    });
  }, []);

  // Track AI interest when user starts typing
  useEffect(() => {
    if (prompt.length > 0 && !hasTrackedInterest) {
      trackClientJourneyEvent("ai_interest_shown", {
        page: window.location.pathname,
        source: "landing_page",
      });
      setHasTrackedInterest(true);
    }
  }, [prompt, hasTrackedInterest]);

  const handleFileSelect = (file: File, type: FileUploadType) => {
    setUploadedFile(file);

    const config = FILE_TYPE_CONFIGS[type];
    if (config) {
      setPrompt(config.prompt);
    }

    trackClientJourneyEvent('file_upload_selected', {
      type,
      fileName: file.name,
      fileSize: file.size,
    });
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!prompt.trim()) return;

    if (loading) {
      return;
    }

    if (!useNewFlow) {
      // Track that signin is required when user submits
      trackClientJourneyEvent("ai_signin_required", {
        page: window.location.pathname,
        prompt_length: prompt.length,
      });
    }

    if (useNewFlow) {
      if (!authSession?.isAuthenticated) {
        trackClientJourneyEvent("ai_signin_required", {
          page: globalThis.location?.pathname,
          prompt_length: prompt.length,
          has_file: !!uploadedFile,
        });

        setAutoSubmit(false);
        triggerAuth();
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      await openInStudio(
        prompt,
        projectType === "all" ? "web" : projectType,
        uploadedFile
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : "Request failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoSubmit && authSession?.isAuthenticated) {
      handleSubmit(new Event('submit') as any);
      setAutoSubmit(false); // Reset
    }
  }, [authSession, autoSubmit]);

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPrompt('');
  };

  const isEmail = projectType === "email";

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-black text-white",
        className
      )}
    >
      <HeaderStandalone showIntegrations={isEmail} />
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
                  Build beautiful
                  <span className="text-violet-400 italic !font-semibold mx-1">
                    {isEmail ? "emails" : "websites"}
                  </span>{" "}
                  with AI
                </h1>
                <h2 className="text-xl sm:text-2xl mt-6 text-gray-300 font-light">
                  With drag & drop editing and HTML output
                </h2>
                <h3 className="text-md sm:text-xl mt-4 text-gray-200 opacity-70">
                  Your <RotatingText texts={headlineTexts} /> will love you
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <PromptTextarea
                  prompt={prompt}
                  loading={loading}
                  isEmail={isEmail}
                  projectType={projectType}
                  setProjectType={setProjectType}
                  setPrompt={setPrompt}
                  setShowButtonHighlight={setShowButtonHighlight}
                  handleSubmit={handleSubmit}
                  uploadedFile={uploadedFile}
                  onFileSelect={useNewFlow ? handleFileSelect : undefined}
                  onRemoveFile={handleRemoveFile}
                />
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

function PromptTextarea(props: Readonly<{
  prompt: string;
  loading?: boolean;
  isEmail?: boolean;
  projectType: ProjectType;
  setProjectType: (p: ProjectType) => void;
  setPrompt: (s: string) => void;
  setShowButtonHighlight: (b: boolean) => void;
  handleSubmit: (e: any) => void;
  uploadedFile?: File | null;
  onFileSelect?: (file: File, type: FileUploadType) => void;
  onRemoveFile?: () => void;
}>) {
  const {
    prompt,
    isEmail,
    loading,
    projectType,
    setProjectType,
    setPrompt,
    handleSubmit,
    setShowButtonHighlight,
    uploadedFile,
    onFileSelect,
    onRemoveFile,
  } = props;
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [showHighlight, setShowHighlight] = useState(false);
  const speechToText = useSpeechToText();
  const { isListening, transcript } = speechToText;

  // Update prompt when speech-to-text transcript changes
  useEffect(() => {
    transcript && setPrompt(transcript);
  }, [transcript]);

  useEffect(() => {
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
        setTimeout(() => { }, pauseBeforeType);
      } else if (isDeleting) {
        setTypedText(currentText.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentText.substring(0, typedText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentHeadlineIndex]);

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

  return (
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
      <div className="w-full py-3 px-5">
        {/* File upload indicator */}
        {uploadedFile && (
          <div className="mb-3 flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 rounded-lg px-3 py-2">
            <div className="flex-1 flex items-center gap-2 text-sm">
              <Icon
                path={mdiContentCopy}
                size={0.8}
                className="text-violet-400"
              />
              <span className="text-white truncate">{uploadedFile.name}</span>
              <span className="text-gray-400 text-xs">
                ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <button
              type="button"
              onClick={onRemoveFile}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Remove file"
            >
              <Icon path={mdiClose} size={0.8} />
            </button>
          </div>
        )}

        <textarea
          value={prompt}
          onChange={(e) => setPrompt((e.target.value || "").slice(0, 3500))}
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
            "text-lg min-h-[60px]",
            "box-border border-solid border-current",
            "font-inherit font-feature-inherit font-variation-inherit",
            "font-inherit tracking-inherit text-inherit",
            "outline-2 outline-transparent"
          )}
          style={{
            WebkitTextSizeAdjust: "100%",
            tabSize: 4,
            WebkitTapHighlightColor: "transparent",
          }}
          placeholder={
            isEmail
              ? `Let's create an email for your ${typedText}`
              : `Let's create a website for your ${typedText}`
          }
          required
          disabled={loading}
          autoFocus
        />
      </div>
      <div className="w-full px-4 pb-2 flex items-center justify-between">
        <TabsStandalone value={projectType} onChange={setProjectType} />
        <div className="flex gap-2 items-center">
          {/* Upload menu button */}
          {onFileSelect && !isEmail && (
            <UploadMenu onFileSelect={onFileSelect} disabled={loading} />
          )}

          {/* Speech-to-text mic button */}
          {speechToText.isSupported && (
            <button
              type="button"
              onClick={isListening ? speechToText.stop : speechToText.start}
              className={cn(
                "flex items-center justify-center rounded-full p-2 transition-colors",
                "hover:opacity-90",
                isListening
                  ? "bg-red-500 text-white"
                  : "text-white/60 hover:text-white/80"
              )}
              aria-label={isListening ? "Stop listening" : "Start voice input"}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              <Icon
                path={isListening ? mdiMicrophoneOff : mdiMicrophone}
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
              !prompt.trim() && !loading && "opacity-30 cursor-not-allowed",
              prompt.trim() && !loading && "hover:opacity-90",
              loading && "opacity-50"
            )}
            aria-label="Submit"
          >
            {loading ? (
              <span className="px-2">Submitting...</span>
            ) : (
              <Icon path={mdiSend} size={1.2} />
            )}
          </button>
        </div>
      </div>
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
    label: "Clone a website",
    prompt: "Copy this website for me: https://wordpress.org",
  },
  {
    icon: mdiAccount,
    label: "Personal Website",
    prompt:
      "Create a personal website with about me, projects, skills and contact sections.",
  },
  {
    icon: mdiAirplaneLanding,
    label: "New Product Landing Page",
    prompt:
      "Create a landing page for a new product landing page with a hero section, services, testimonials, and contact form.",
  },
];

const recommendationsEmail: RecommendationItem[] = [
  {
    icon: mdiGiftOutline,
    label: "Promotional Offer",
    prompt:
      "Create a promotional email with a discount offer, eye-catching banner, offer details, and a button to shop now.",
  },
  {
    icon: mdiCalendarStar,
    label: "Event Invitation",
    prompt:
      "Design a newsletter inviting users to an upcoming event, with date, location, RSVP button, and agenda highlights.",
  },
  {
    icon: mdiAccountHeart,
    label: "Welcome Email",
    prompt:
      "Design a friendly welcome email for new subscribers, with a thank-you message, what to expect, and helpful links to get started.",
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
