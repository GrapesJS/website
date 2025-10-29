import React from "react";
import { getTemplatePreviewUrl, getTemplateCreateUrl } from "@/lib/grapes-api";
import type { HomepageData } from "@/lib/grapes-api";
import styles from "./styles.module.css";
import { TemplateButton } from "./TemplateButton";

interface TemplateCardProps {
  template: HomepageData["templates"][0];
  onSelect?: (template: HomepageData["templates"][0]) => void;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const previewUrl = getTemplatePreviewUrl(template.media);
  const createUrl = getTemplateCreateUrl(template.editorUrl);

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
          <TemplateButton createUrl={createUrl} template={template} />
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{template.name}</h3>
      </div>
    </div>
  );
}
