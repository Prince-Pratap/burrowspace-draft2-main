import { createServerFn } from "@tanstack/react-start";
import { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout, getContactSubmissions, saveContactSubmission } from "@/lib/api-utils.server";
import type { FAQItem, AboutResponse, ContactFormData } from "@/types/api";

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

export const submitContactFn = createServerFn()
  .handler(async (contactData: ContactFormData) => {
    const success = await saveContactSubmission(contactData);
    if (!success) {
      throw new Error("Failed to save contact message");
    }
    return { success: true };
  });

export const fetchContactSubmissionsFn = createServerFn()
  .handler(async () => {
    return getContactSubmissions();
  });