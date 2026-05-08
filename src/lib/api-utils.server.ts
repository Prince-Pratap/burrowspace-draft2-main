/**
 * Server-only utilities for fetching About and FAQ data
 * Now uses Cloudflare KV storage for persistence
 */

import { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout } from "@/lib/kv-storage.server";
import type { FAQItem, AboutResponse } from "@/types/api";

// Re-export functions from KV storage
export { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout };
