import { useNavigate } from "react-router-dom";
import { LandingPage } from "../legacy/OriginalUI.jsx";

export function Landing() {
  const navigate = useNavigate();
  return (
    <LandingPage
      onGetStarted={() => navigate("/setup")}
      onAdmin={() => navigate("/saas")}
    />
  );
}
