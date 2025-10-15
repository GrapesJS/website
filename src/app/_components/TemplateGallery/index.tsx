'use client';

import React from 'react';
import { useHomepageData } from '@/hooks/useHomepageData';
import { TemplateCard } from '../TemplateCard';
import { ProjectCard } from '../ProjectCard';
import styles from './styles.module.css';

interface TemplateGalleryProps {
  defaultType?: 'web' | 'email' | 'all';
  defaultLimit?: number;
  showUserGreeting?: boolean;
  className?: string;
}

export function TemplateGallery({ 
  defaultType = 'all', 
  defaultLimit = 12,
  showUserGreeting = true,
  className = ''
}: TemplateGalleryProps) {
  const { 
    user, 
    templates, 
    projects, 
    isAuthenticated, 
    loading, 
    error 
  } = useHomepageData({ 
    type: defaultType, 
    limit: defaultLimit,
    includeProjects: true 
  });

  if (loading) {
    return (
      <div className={`${styles.templateGallery} ${className}`}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.templateGallery} ${className}`}>
        <div className={styles.error}>
          <p>Failed to load templates. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`${styles.templateGallery} ${className}`}>
      <div className={styles.header}>
        {showUserGreeting && isAuthenticated && user ? (
          <>
            <h2>Welcome back, {user.name}!</h2>
            <p>Continue working on your projects or start fresh with a template</p>
          </>
        ) : (
          <>
            <h2>Choose a Template</h2>
            <p>Start building right away</p>
          </>
        )}
      </div>

      <div className={styles.templates}>
        <h3>Choose a Template</h3>
        
        <div className={styles.grid}>
          {templates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
            />
          ))}
        </div>
      </div>

      {isAuthenticated && projects && projects.length > 0 && (
        <div className={styles.projects}>
          <h3>Your Recent Projects</h3>
          <div className={styles.projectsGrid}>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
        </div>
      )}

      {templates.length === 0 && !loading && (
        <div className={styles.empty}>
          <p>No templates found.</p>
        </div>
      )}
    </section>
  );
}

