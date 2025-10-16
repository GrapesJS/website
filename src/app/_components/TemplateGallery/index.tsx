"use client";

import React from "react";
import { useHomepageData } from "@/hooks/useHomepageData";
import { TemplateCard } from "../TemplateCard";
import { ProjectCard } from "../ProjectCard";
import styles from "./styles.module.css";

interface TemplateGalleryProps {
  defaultType?: "web" | "email" | "all";
  defaultLimit?: number;
  showUserGreeting?: boolean;
  className?: string;
}

export function TemplateGallery({
  defaultType = "all",
  defaultLimit = 20,
  showUserGreeting = true,
  className = "",
}: TemplateGalleryProps) {
  const { user, templates, projects, isAuthenticated, loading } =
    useHomepageData({
      type: defaultType,
      limit: defaultLimit,
    });

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  if (!templates?.length && !projects?.length) return null;

  return (
    <section className={`${styles.templateGallery} ${className}`}>
      <div className={styles.header}>
        {showUserGreeting && !!isAuthenticated && !!user && (
          <>
            <h2>Welcome back, {user.name}!</h2>
            <p>
              Continue working on your projects or start fresh with a template
            </p>
          </>
        )}
      </div>

      {templates.length > 0 && (
        <div className={styles.templates}>
          <h2 className="text-center mb-16 text-5xl">Start with a Template</h2>
          <div className={styles.grid}>
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      )}

      {isAuthenticated && projects && projects.length > 0 && (
        <div className={styles.projects}>
          <h3>Your Recent Projects</h3>
          <div className={styles.projectsGrid}>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
