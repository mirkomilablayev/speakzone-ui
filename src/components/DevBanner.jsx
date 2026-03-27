import { useEffect, useState } from "react";

export default function DevBanner() {
  const [token, setToken] = useState("—");

  useEffect(() => {
    try {
      const data = window?.Telegram?.WebApp?.initData ?? "";
      setToken(data.length > 0 ? data.slice(0, 60) + (data.length > 60 ? "…" : "") : "No initData (not inside Telegram)");
    } catch {
      setToken("Error reading initData");
    }
  }, []);

  return (
    <div className="w-full flex items-center gap-2 px-3 flex-shrink-0 overflow-hidden"
      style={{ height: 28, background: "#12102a", borderBottom: "1px solid rgba(123,92,240,0.25)" }}>
      <span className="text-purple font-bold shrink-0 font-mono" style={{ fontSize: 9 }}>TG:</span>
      <span className="text-slate-400 truncate font-mono" style={{ fontSize: 9 }}>{token}</span>
    </div>
  );
}
