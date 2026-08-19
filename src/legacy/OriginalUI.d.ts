import type { ReactElement } from "react";

export interface DisplayReview {
  id: number;
  name: string;
  rating: number;
  time: string;
  text: string;
  avatar: string;
}

export interface DisplayLocation {
  name: string;
  address: string;
  placeId: string;
  rating: number;
  reviewCount: number;
}

export interface DisplayEvent {
  id: number;
  type: string;
  label: string;
  time: string;
}

export interface WizardConfig {
  slug?: string;
  plan?: string;
  businessName: string;
  placeId: string;
  address: string;
  rating: number;
  reviewCount: number;
  displayMode: "ipad" | "tv";
  minStars: number;
  theme: "light" | "dark";
  socialConnected: Record<string, boolean>;
  socialHandles: Record<string, string>;
  logoUrl: string | null;
  reviews?: DisplayReview[];
  locations?: DisplayLocation[];
  events?: DisplayEvent[];
  qrScans?: number;
}

export function LandingPage(props: { onGetStarted: () => void; onAdmin?: () => void }): ReactElement;
export function SetupWizard(props: { onComplete: (config: WizardConfig) => void }): ReactElement;
export function Dashboard(props: {
  config: WizardConfig;
  onPersistPlan?: (plan: string) => void;
  onPersistTheme?: (theme: "light" | "dark") => void;
  onPersistPin?: (pin: string) => void;
  onPersistLocation?: (loc: DisplayLocation) => void;
  onVerifyPin?: (pin: string) => Promise<boolean>;
}): ReactElement;
export function SaasAdmin(props: {
  onBack: () => void;
  extraCustomers?: Array<Record<string, unknown>>;
}): ReactElement;
