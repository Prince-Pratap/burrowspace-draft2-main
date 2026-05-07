/**
 * Client-side API utilities for fetching About and FAQ data
 * Uses TanStack Start server functions for safe server communication
 */

import type { FAQItem, AboutResponse } from "@/types/api";
import { fetchAllFaqsFn, searchFaqsFn, getFaqCategoriesFn, fetchAboutDataFn } from "./api-endpoints";

/**
 * Get all FAQs
 */
export async function fetchAllFaqs(): Promise<FAQItem[]> {
  try {
    return await fetchAllFaqsFn();
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}

/**
 * Search FAQs by query and/or category
 */
export async function searchFaqsData(
  query: string = "",
  category: string = "All"
): Promise<FAQItem[]> {
  try {
    return await searchFaqsFn({ query, category });
  } catch (error) {
    console.error("Failed to search FAQs:", error);
    return [];
  }
}

/**
 * Get unique FAQ categories
 */
export async function getFaqCategories(): Promise<string[]> {
  try {
    return await getFaqCategoriesFn();
  } catch (error) {
    console.error("Failed to fetch FAQ categories:", error);
    return ["All"];
  }
}

/**
 * Get About page data
 */
export async function fetchAboutData(): Promise<AboutResponse> {
  try {
    return await fetchAboutDataFn();
  } catch (error) {
    console.error("Failed to fetch About data:", error);
    return { sections: [], founders: [] };
  }
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
