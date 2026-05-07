/**
 * API Type Definitions for BurrowSpace Backend
 */

// FAQ Types
export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export interface FAQsResponse {
  items: FAQItem[];
}

// About Page Types
export interface AboutSection {
  id: string;
  label: string;
  title: string;
  content: string;
  highlight: string | null;
  image: string;
  reverse: boolean;
}

export interface FounderCard {
  id: string;
  name: string;
  role: string;
  quote: string;
  reverse: boolean;
}

export interface AboutResponse {
  sections: AboutSection[];
  founders: FounderCard[];
}

// Generic API Response Type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
