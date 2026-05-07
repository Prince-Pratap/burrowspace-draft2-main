import { createServerFn } from "@tanstack/react-start";
import { getAllFaqs, searchFaqs, getFaqCategories, getAbout } from "@/lib/api-utils.server";

/**
 * Server functions for API endpoints
 * These can be safely called from client code
 */

export const fetchAllFaqsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return getAllFaqs();
  });

export const searchFaqsFn = createServerFn({ method: "GET" })
  .validator((input: { query?: string; category?: string }) => input)
  .handler(async ({ query = "", category = "All" }) => {
    return searchFaqs(query, category);
  });

export const getFaqCategoriesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return getFaqCategories();
  });

export const fetchAboutDataFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return getAbout();
  });