/**
 * Cloudflare KV-based data storage utilities
 * This replaces the static JSON files with persistent KV storage
 */

import type { FAQItem, AboutResponse } from "@/types/api";

// KV namespace binding (will be available in Cloudflare Workers environment)
declare const FAQS_KV: KVNamespace;
declare const ABOUT_KV: KVNamespace;

const getFaqsNamespace = (): KVNamespace | undefined => {
  if (typeof FAQS_KV !== 'undefined') return FAQS_KV;
  return (globalThis as any).FAQS_KV ?? (globalThis as any).KV;
};

const getAboutNamespace = (): KVNamespace | undefined => {
  if (typeof ABOUT_KV !== 'undefined') return ABOUT_KV;
  return (globalThis as any).ABOUT_KV ?? (globalThis as any).KV;
};

// Default data (fallback if KV is empty)
const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "What is BurrowSpace?",
    a: "BurrowSpace is a secure, decentralized platform for digital asset management and collaboration.",
    category: "General"
  },
  {
    q: "How do I get started?",
    a: "Simply create an account and start exploring our features. Our intuitive interface makes it easy to begin.",
    category: "Getting Started"
  }
];

const DEFAULT_ABOUT: AboutResponse = {
  sections: [
    {
      title: "Our Mission",
      label: "mission",
      content: "To provide secure and accessible digital asset management solutions."
    }
  ],
  founders: []
};

/**
 * Get all FAQs from KV storage
 */
export async function getAllFaqs(): Promise<FAQItem[]> {
  try {
    const kv = getFaqsNamespace();
    if (kv) {
      const data = await kv.get('faqs');
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with default data
      await kv.put('faqs', JSON.stringify(DEFAULT_FAQS));
      return DEFAULT_FAQS;
    }
  } catch (error) {
    console.error('Failed to load FAQs from KV:', error);
  }

  // Fallback to default data
  return DEFAULT_FAQS;
}

/**
 * Search FAQs by query and/or category
 */
export async function searchFaqs(query: string = "", category: string = "All"): Promise<FAQItem[]> {
  const allFaqs = await getAllFaqs();

  return allFaqs.filter(faq => {
    const matchesQuery = query === "" ||
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === "All" || faq.category === category;

    return matchesQuery && matchesCategory;
  });
}

/**
 * Get unique FAQ categories
 */
export async function getFaqCategories(): Promise<string[]> {
  const allFaqs = await getAllFaqs();
  const categories = [...new Set(allFaqs.map(faq => faq.category))];
  return ["All", ...categories.sort()];
}

/**
 * Save FAQs to KV storage
 */
export async function saveFaqs(faqs: FAQItem[]): Promise<boolean> {
  try {
    const kv = getFaqsNamespace();
    if (kv) {
      await kv.put('faqs', JSON.stringify(faqs));
      return true;
    }
  } catch (error) {
    console.error('Failed to save FAQs to KV:', error);
  }
  return false;
}

/**
 * Get About data from KV storage
 */
export async function getAbout(): Promise<AboutResponse> {
  try {
    const kv = getAboutNamespace();
    if (kv) {
      const data = await kv.get('about');
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with default data
      await kv.put('about', JSON.stringify(DEFAULT_ABOUT));
      return DEFAULT_ABOUT;
    }
  } catch (error) {
    console.error('Failed to load About data from KV:', error);
  }

  // Fallback to default data
  return DEFAULT_ABOUT;
}

/**
 * Save About data to KV storage
 */
export async function saveAbout(about: AboutResponse): Promise<boolean> {
  try {
    const kv = getAboutNamespace();
    if (kv) {
      await kv.put('about', JSON.stringify(about));
      return true;
    }
  } catch (error) {
    console.error('Failed to save About data to KV:', error);
  }
  return false;
}