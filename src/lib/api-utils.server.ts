/**
 * Server-only utilities for fetching About and FAQ data
 * This file is only executed on the server
 */

import faqsData from "@/server/data/faqs.json";
import aboutData from "@/server/data/about.json";
import type { FAQItem, AboutResponse } from "@/types/api";

let cachedFaqsData: FAQItem[] | null = null;
let cachedAboutData: AboutResponse | null = null;

/**
 * Get all FAQs
 */
export function getAllFaqs(): FAQItem[] {
  if (cachedFaqsData) {
    return cachedFaqsData;
  }

  try {
    cachedFaqsData = (faqsData as any).items || [];
    return cachedFaqsData;
  } catch (error) {
    console.error("Failed to load FAQs:", error);
    return [];
  }
}

/**
 * Search FAQs by query and/or category
 */
export function searchFaqs(
  query: string = "",
  category: string = "All"
): FAQItem[] {
  const items = getAllFaqs();
  const normalizedQuery = query.toLowerCase();

  let filtered = items;

  // Filter by category
  if (category && category !== "All") {
    filtered = filtered.filter(
      (faq) => faq.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search query
  if (normalizedQuery.trim()) {
    filtered = filtered.filter(
      (faq) =>
        faq.q.toLowerCase().includes(normalizedQuery) ||
        faq.a.toLowerCase().includes(normalizedQuery)
    );
  }

  return filtered;
}

/**
 * Get unique FAQ categories
 */
export function getFaqCategories(): string[] {
  const items = getAllFaqs();
  const categories = Array.from(new Set(items.map((faq) => faq.category)));
  return ["All", ...categories];
}

/**
 * Get About page data
 */
export function getAbout(): AboutResponse {
  if (cachedAboutData) {
    return cachedAboutData;
  }

  try {
    cachedAboutData = (aboutData as any) || { sections: [], founders: [] };
    return cachedAboutData;
  } catch (error) {
    console.error("Failed to load About data:", error);
    return { sections: [], founders: [] };
  }
}

/**
 * Get About sections only
 */
export function getAboutSections() {
  return getAbout().sections;
}

/**
 * Get About founders only
 */
export function getAboutFounders() {
  return getAbout().founders;
}
