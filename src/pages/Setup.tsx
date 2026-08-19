import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { SetupWizard } from "../legacy/OriginalUI.jsx";
import type { WizardConfig } from "../legacy/OriginalUI";
import type { SocialPlatform } from "../types";

export function Setup() {
  const navigate = useNavigate();

  async function launch(config: WizardConfig) {
    const social = Object.fromEntries(
      (["instagram", "facebook", "tiktok"] as SocialPlatform[]).map((platform) => [
        platform,
        {
          connected: Boolean(config.socialConnected?.[platform]),
          handle: config.socialHandles?.[platform] || "",
        },
      ]),
    );
    const business = await api.createBusiness({
      name: config.businessName,
      placeId: config.placeId,
      address: config.address,
      rating: config.rating,
      reviewCount: config.reviewCount,
      displayMode: config.displayMode || "ipad",
      minStars: config.minStars || 0,
      theme: config.theme || "light",
      logoUrl: config.logoUrl,
      social,
    });
    navigate(`/display/${business.slug}`);
  }

  return <SetupWizard onComplete={(config) => void launch(config)} />;
}
