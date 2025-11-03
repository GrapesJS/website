"use client";

import React from "react";
import type { HomepageData } from "@/lib/grapes-api";

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
    if (window.posthog.flush) {
      window.posthog.flush();
    }
  }
}

interface TemplateButtonProps {
  createUrl: string;
  template: HomepageData["templates"][0];
}

export function TemplateButton({ createUrl, template }: TemplateButtonProps) {
  const handleClick = () => {
    trackClientJourneyEvent("ai_interest_shown", {
      page: window.location.pathname,
      source: "template_gallery",
      template_id: template.id,
      template_name: template.name,
      template_type: template.type,
    });
    
    setTimeout(() => {
      window.location.href = createUrl;
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline bg-purple-600 border border-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-opacity-90 sm:px-5 sm:py-2 lg:px-6 lg:py-2"
    >
      Use Template
    </button>
  );
}
