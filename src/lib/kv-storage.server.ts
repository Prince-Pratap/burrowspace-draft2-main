/**
 * Cloudflare KV-based data storage utilities
 * This replaces the static JSON files with persistent KV storage
 */

import type { FAQItem, AboutResponse, ContactFormData, ContactSubmission } from "@/types/api";

declare global {
  interface KVNamespace {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  }
}

// Cloudflare Worker bindings - injected at runtime
declare const FAQS_KV: KVNamespace | undefined;
declare const ABOUT_KV: KVNamespace | undefined;

let faqsKVCache: KVNamespace | undefined;
let aboutKVCache: KVNamespace | undefined;

// Initialize KV on first access - Cloudflare injects bindings into global scope
const initializeKV = () => {
  if (!faqsKVCache) {
    try {
      faqsKVCache = (globalThis as any).FAQS_KV;
      if (!faqsKVCache) {
        console.warn('FAQS_KV binding not found in globalThis');
      }
    } catch (e) {
      console.error('Error initializing FAQS_KV:', e);
    }
  }
  
  if (!aboutKVCache) {
    try {
      aboutKVCache = (globalThis as any).ABOUT_KV;
      if (!aboutKVCache) {
        console.warn('ABOUT_KV binding not found in globalThis');
      }
    } catch (e) {
      console.error('Error initializing ABOUT_KV:', e);
    }
  }
};

const getFaqsNamespace = (): KVNamespace | undefined => {
  initializeKV();
  return faqsKVCache;
};

const getAboutNamespace = (): KVNamespace | undefined => {
  initializeKV();
  return aboutKVCache;
};

const getContactNamespace = (): KVNamespace | undefined => getAboutNamespace();
const CONTACT_MESSAGES_KEY = "contact_messages";

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
      id: "mission",
      label: "mission",
      title: "Our Mission",
      content: "To provide secure and accessible digital asset management solutions.",
      highlight: null,
      image: "",
      reverse: false,
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

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const kv = getContactNamespace();
    if (kv) {
      const data = await kv.get(CONTACT_MESSAGES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      await kv.put(CONTACT_MESSAGES_KEY, JSON.stringify([]));
      return [];
    }
  } catch (error) {
    console.error('Failed to load contact submissions from KV:', error);
  }
  return [];
}

export async function saveContactSubmission(formData: ContactFormData): Promise<boolean> {
  try {
    const kv = getContactNamespace();
    if (!kv) {
      console.error('Contact KV namespace is NOT available in this environment', {
        hasFAQS_KV: !!(globalThis as any).FAQS_KV,
        hasABOUT_KV: !!(globalThis as any).ABOUT_KV,
        availableGlobals: Object.keys(globalThis).filter(k => k.toUpperCase().includes('KV')).slice(0, 10)
      });
      return false;
    }
    
    console.log('Contact KV namespace found, proceeding with save');
    const existing = await getContactSubmissions();
    const submission: ContactSubmission = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };
    await kv.put(CONTACT_MESSAGES_KEY, JSON.stringify([...existing, submission]));
    console.log('Contact submission saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save contact submission to KV:', error);
  }
  return false;
}

