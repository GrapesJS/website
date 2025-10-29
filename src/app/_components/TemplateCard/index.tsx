"use client";

import React from "react";
import { getTemplatePreviewUrl, getTemplateCreateUrl } from "@/lib/grapes-api";
import type { HomepageData } from "@/lib/grapes-api";
import styles from "./styles.module.css";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
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

interface TemplateCardProps {
  template: HomepageData["templates"][0];
  onSelect?: (template: HomepageData["templates"][0]) => void;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const previewUrl = getTemplatePreviewUrl(template.media);
  const createUrl = getTemplateCreateUrl(template.editorUrl);

  const handleClick = () => {
    trackClientJourneyEvent("ai_interest_shown", {
      page: window.location.pathname,
      source: "template_gallery",
      template_id: template.id,
      template_name: template.name,
      template_type: template.type,
    });
    window.location.href = createUrl;
  };

  return (
    <div className={styles.templateCard}>
      <div className={styles.preview}>
        <img
          src={previewUrl}
          alt={template.name}
          loading="lazy"
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src = "/assets/images/grapesjs-front-page-m.jpg";
          }}
        />
        <div className={styles.overlay}>
          <button
            onClick={handleClick}
            className="inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline bg-purple-600 border border-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-opacity-90 sm:px-5 sm:py-2 lg:px-6 lg:py-2"
          >
            Use Template
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{template.name}</h3>
      </div>
    </div>
  );
}
