import { createServerFn } from "@tanstack/react-start";
import { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout } from "@/lib/api-utils.server";
import type { FAQItem, AboutResponse } from "@/types/api";

/**
 * Server functions for API endpoints
 * These can be safely called from client code
 */

export const fetchAllFaqsFn = createServerFn()
  .handler(async () => {
    return getAllFaqs();
  });

export const searchFaqsFn = createServerFn()
  .handler(async (input: { query?: string; category?: string } = {}) => {
    const { query = "", category = "All" } = input;
    return searchFaqs(query, category);
  });

export const getFaqCategoriesFn = createServerFn()
  .handler(async () => {
    return getFaqCategories();
  });

export const fetchAboutDataFn = createServerFn()
  .handler(async () => {
    return getAbout();
  });

// Admin functions for saving data
export const saveFaqsFn = createServerFn()
  .handler(async (faqs: FAQItem[]) => {
    const success = await saveFaqs(faqs);
    if (!success) {
      throw new Error("Failed to save FAQs");
    }
    return { success: true };
  });

export const saveAboutFn = createServerFn()
  .handler(async (about: AboutResponse) => {
    const success = await saveAbout(about);
    if (!success) {
      throw new Error("Failed to save About data");
    }
    return { success: true };
  });