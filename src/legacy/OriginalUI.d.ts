import type { ReactElement } from "react";

export interface WizardConfig {
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
}

export function LandingPage(props: { onGetStarted: () => void; onAdmin?: () => void }): ReactElement;
export function SetupWizard(props: { onComplete: (config: WizardConfig) => void }): ReactElement;
export function Dashboard(props: { config: WizardConfig }): ReactElement;
export function SaasAdmin(props: {
  onBack: () => void;
  extraCustomers?: Array<Record<string, unknown>>;
}): ReactElement;
