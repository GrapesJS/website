import React from 'react';
import { getTemplatePreviewUrl, getTemplateCreateUrl } from '@/lib/grapes-api';
import type { HomepageData } from '@/lib/grapes-api';
import styles from './styles.module.css';

interface TemplateCardProps {
  template: HomepageData['templates'][0];
  onSelect?: (template: HomepageData['templates'][0]) => void;
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const previewUrl = getTemplatePreviewUrl(template.media);
  const createUrl = getTemplateCreateUrl(template.editorUrl);

  const handleClick = () => {
    if (onSelect) {
      onSelect(template);
    } else {
      window.location.href = createUrl;
    }
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
            e.currentTarget.src = '/assets/images/grapesjs-front-page-m.jpg';
          }}
        />
        <div className={styles.overlay}>
          <button 
            onClick={handleClick}
            className={styles.button}
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

