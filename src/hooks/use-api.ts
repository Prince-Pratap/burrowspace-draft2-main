import { useQuery } from "@tanstack/react-query";
import type { AboutResponse, FAQsResponse, ApiResponse } from "@/types/api";

/**
 * Hook to fetch About page data
 */
export function useAboutData() {
  return useQuery({
    queryKey: ["about"],
    queryFn: async (): Promise<AboutResponse> => {
      // Try to fetch from API first
      try {
        const response = await fetch("/api/about");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: ApiResponse<AboutResponse> = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      } catch (error) {
        // Fallback: If API route doesn't work, return empty structure
        console.warn("Failed to fetch from /api/about, using fallback");
      }

      // Fallback structure
      return {
        sections: [],
        founders: [],
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch FAQs
 */
export function useFaqsData() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async (): Promise<FAQsResponse> => {
      try {
        const response = await fetch("/api/faqs");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: ApiResponse<FAQsResponse> = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      } catch (error) {
        console.warn("Failed to fetch from /api/faqs, using fallback");
      }

      return { items: [] };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to search FAQs
 */
export function useFaqsSearch(query: string, category: string = "All") {
  return useQuery({
    queryKey: ["faqs-search", query, category],
    queryFn: async (): Promise<FAQsResponse> => {
      try {
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (category && category !== "All") params.append("category", category);

        const response = await fetch(`/api/faqs/search?${params}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: ApiResponse<FAQsResponse> = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      } catch (error) {
        console.warn("Failed to search FAQs");
      }

      return { items: [] };
    },
    staleTime: 1000 * 60, // 1 minute (shorter for search results)
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch FAQ categories
 */
export function useFaqCategories() {
  return useQuery({
    queryKey: ["faq-categories"],
    queryFn: async (): Promise<string[]> => {
      try {
        const response = await fetch("/api/faqs/categories");
        if (!response.ok) throw new Error("Failed to fetch");
        const data: ApiResponse<{ categories: string[] }> = await response.json();
        if (data.success && data.data) {
          return data.data.categories;
        }
      } catch (error) {
        console.warn("Failed to fetch FAQ categories");
      }

      return ["All"];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}
