import React from 'react';
import type { HomepageData } from '@/lib/grapes-api';
import styles from './styles.module.css';

interface ProjectCardProps {
  project: HomepageData['projects'][0];
  onSelect?: (project: HomepageData['projects'][0]) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const projectUrl = `https://app.grapesjs.com/project/${project.id}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect(project);
    } else {
      window.location.href = projectUrl;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.projectCard}>
      <div className={styles.preview}>
        <div className={styles.placeholder}>
          <span className={styles.icon}>
            {project.type === 'web' ? '🌐' : '📧'}
          </span>
        </div>
        <div className={styles.overlay}>
          <button 
            onClick={handleClick}
            className={styles.button}
          >
            Open Project
          </button>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>{project.name}</h3>
        
        <div className={styles.meta}>
          <span className={styles.date}>
            Updated {formatDate(project.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
