import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Setup } from "./pages/Setup";
import { Display } from "./pages/Display";
import { OwnerAdmin } from "./pages/OwnerAdmin";
import { SaasAdmin } from "./pages/SaasAdmin";
import { ReviewGate } from "./pages/ReviewGate";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let buffer = "";
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      buffer = (buffer + e.key.toLowerCase()).slice(-10);
      if (buffer.includes("admin")) {
        buffer = "";
        navigate("/saas");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/display/:slug" element={<Display />} />
      <Route path="/admin/:slug" element={<OwnerAdmin />} />
      <Route path="/r/:slug" element={<ReviewGate />} />
      <Route path="/saas" element={<SaasAdmin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
