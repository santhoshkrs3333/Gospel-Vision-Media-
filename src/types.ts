export interface Platform {
  name: string;
  category: 'Global Giants' | 'Streaming & Social' | 'Regional & Audiophile';
  description: string;
  badge?: string;
  iconBg: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  tagline: string;
  price: string;
  currency: string;
  period?: string;
  popular?: boolean;
  deliveryTime: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  releaseTitle: string;
  releaseDate: string;
  message: string;
}
