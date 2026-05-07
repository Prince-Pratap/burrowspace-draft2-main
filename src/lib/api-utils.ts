/**
 * Client-side API utilities for fetching About and FAQ data
 * This uses the server-only functions when needed
 */

import type { FAQItem, AboutResponse } from "@/types/api";

/**
 * Get all FAQs
 */
export async function fetchAllFaqs(): Promise<FAQItem[]> {
  // For now, return empty array
  // In a real app, this would fetch from a server endpoint
  return [];
}

/**
 * Search FAQs by query and/or category
 */
export async function searchFaqsData(
  query: string = "",
  category: string = "All"
): Promise<FAQItem[]> {
  // For now, return empty array
  // In a real app, this would fetch from a server endpoint
  return [];
}

/**
 * Get unique FAQ categories
 */
export async function getFaqCategories(): Promise<string[]> {
  // For now, return default
  // In a real app, this would fetch from a server endpoint
  return ["All"];
}

/**
 * Get About page data
 */
export async function fetchAboutData(): Promise<AboutResponse> {
  return { sections: [], founders: [] };
}

/**
 * Get About sections only
 */
export async function fetchAboutSections() {
  const data = await fetchAboutData();
  return data.sections;
}

/**
 * Get About founders only
 */
export async function fetchAboutFounders() {
  const data = await fetchAboutData();
  return data.founders;
}
