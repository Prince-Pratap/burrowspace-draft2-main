export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export type FAQ = {
  q: string;
  a: string;
  category: string;
};

const FAQS: FAQ[] = [
  {
    category: "General",
    q: "What is BurrowSpace?",
    a: "BurrowSpace is a sovereign data-security platform — built in India — that lets individuals and businesses transfer, store, and collaborate on files without surrendering their data to foreign infrastructure.",
  },
  {
    category: "General",
    q: "Why was BurrowSpace built?",
    a: "Because privacy shouldn't be a myth. The world has normalized handing personal data to a handful of American hyperscalers. We're re-defining data security globally — independent, encrypted, and accountable.",
  },
  {
    category: "Security",
    q: "How is my data protected?",
    a: "Every file fragment is end-to-end encrypted before it leaves your device. Keys never touch our servers, and metadata is minimized by design. Even we can't read your data.",
  },
  {
    category: "Security",
    q: "Where is my data stored?",
    a: "On sovereign infrastructure operated within India. No silent replication to foreign jurisdictions, no third-party processors with hidden access.",
  },
  {
    category: "Privacy",
    q: "Do you sell or analyze my data?",
    a: "Never. Our business model is the product — not your behavior. No ads, no profiling, no data brokers.",
  },
  {
    category: "Privacy",
    q: "Can the government or BurrowSpace access my files?",
    a: "Files are encrypted with keys only you hold. We physically cannot decrypt your content, regardless of who asks.",
  },
  {
    category: "Product",
    q: "Who is BurrowSpace for?",
    a: "Creators, D2C brands, B2B teams, and anyone whose work depends on the data they own. From a freelancer sharing drafts to enterprises moving sensitive IP.",
  },
  {
    category: "Product",
    q: "How is this different from Google Drive or Dropbox?",
    a: "Those services run on foreign infrastructure with broad data access. BurrowSpace is built privacy-first, sovereign-by-default, and answerable to Indian law — not a foreign parent company.",
  },
  {
    category: "Getting Started",
    q: "How do I sign up?",
    a: "Early access is rolling out in waves. Click 'Get Started' on any page and we'll reach out as soon as your slot opens.",
  },
  {
    category: "Getting Started",
    q: "Is there a free tier?",
    a: "Yes. Individual users get a generous free tier so privacy is never paywalled. Teams and enterprises unlock advanced controls on paid plans.",
  },
];

export const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((faq) => faq.category)))];

const randomDelay = (min: number, max: number) =>
  new Promise((resolve) => setTimeout(resolve, min + Math.round(Math.random() * (max - min))));

export async function submitContact(formData: ContactFormData) {
  await randomDelay(800, 1200);

  if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
    throw new Error("Please fill in all fields before sending your message.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (Math.random() < 0.08) {
    throw new Error("Oops — something went wrong while sending. Please try again.");
  }

  return { success: true };
}

export async function fetchFaqs() {
  await randomDelay(500, 900);
  return [...FAQS];
}

export async function searchFaqs(query: string, category: string) {
  await randomDelay(300, 550);

  return FAQS.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category;
    const matchesQuery =
      query.trim() === "" ||
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}
