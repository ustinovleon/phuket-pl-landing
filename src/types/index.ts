// Property Types
export type StatusCategory = 'READY' | '2026' | '2027';
export type PropertyType = 'CONDO' | 'VILLA';
export type OwnershipType = 'FREEHOLD' | 'LEASEHOLD' | 'MIXED';

export interface UnitType {
  name: string;
  sizeSqmFrom: number;
  sizeSqmTo: number;
  priceFromTHB: number;
  priceFromEUR: number;
}

export interface Document {
  title: string;
  url: string;
}

export interface TransparencyInfo {
  camPerSqm?: number;
  sinkingFund?: number;
  transferFee?: string;
  managementFee?: string;
  notes?: string;
}

export interface Property {
  id: string;
  statusCategory: StatusCategory;
  projectName: string;
  area: string;
  propertyType: PropertyType;
  unitTypes: UnitType[];
  sizeSqmFrom: number;
  sizeSqmTo: number;
  priceFromTHB: number;
  priceFromEUR: number;
  ownership: OwnershipType;
  completion: string | null; // YYYY-MM format or null
  highlights: string[];
  transparency?: TransparencyInfo;
  operatorModel: string | null;
  docs: Document[];
  images: string[];
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Lead/Contact Types
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  goal?: 'RENTAL_INCOME' | 'CAPITAL_GROWTH' | 'PERSONAL_USE' | 'MIXED';
  horizon?: '1-3' | '3-5' | '5-10' | '10+';
  preferredCategory?: StatusCategory;
  riskProfile?: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  dsgvoConsent: boolean;
  marketingConsent: boolean;
  source: string;
  createdAt: Date;
}

// Calculator Types
export interface CalculatorInput {
  purchasePrice: number;
  holdingPeriod: number;
  occupancyRateLow: number;
  occupancyRateHigh: number;
  netYieldLow: number;
  netYieldHigh: number;
  appreciationLow: number;
  appreciationHigh: number;
}

export interface CalculatorResult {
  rentalIncomeLow: number;
  rentalIncomeHigh: number;
  resaleValueLow: number;
  resaleValueHigh: number;
  totalReturnLow: number;
  totalReturnHigh: number;
  annualizedReturnLow: number;
  annualizedReturnHigh: number;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'process' | 'legal' | 'financial' | 'management' | 'general';
}

// User/Auth Types
export type UserRole = 'admin' | 'editor';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt: Date;
}

// Analytics Events
export type AnalyticsEvent = 
  | 'CTA_click'
  | 'whatsapp_click'
  | 'form_start'
  | 'form_submit'
  | 'object_open'
  | 'calculator_use'
  | 'faq_expand'
  | 'document_download'
  | 'tab_switch';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp: Date;
}
