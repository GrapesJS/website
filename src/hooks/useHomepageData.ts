import { useState, useEffect } from "react";
import { fetchHomepageData, HomepageData } from "@/lib/grapes-api";

interface UseHomepageDataOptions {
  type?: "web" | "email" | "all";
  limit?: number;
  includeProjects?: boolean;
}

interface UseHomepageDataReturn {
  data: HomepageData;
  loading: boolean;
  error: Error | null;
  user?: HomepageData["user"];
  templates: HomepageData["templates"];
  projects?: HomepageData["projects"];
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
}

export function useHomepageData(
  options: UseHomepageDataOptions = {}
): UseHomepageDataReturn {
  const { type = "all", limit = 12, includeProjects = false } = options;
  const [data, setData] = useState<HomepageData>({ templates: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchHomepageData({
        type: "all",
        limit: 100,
        includeProjects,
      });
      setData(result);
    } catch (err) {
      setError(err as Error);
      setData({ templates: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tm = setTimeout(fetchData);
    return () => clearTimeout(tm);
  }, [includeProjects]);

  const filteredTemplates = data.templates
    .filter((template) => !!template.media)
    .filter((template) => {
      if (type === "all") return true;
      return template.type === type;
    })
    .slice(0, limit);

  return {
    data,
    loading,
    error,
    user: data.user,
    templates: filteredTemplates,
    projects: data.projects,
    isAuthenticated: !!data.user,
    refetch: fetchData,
  };
}
