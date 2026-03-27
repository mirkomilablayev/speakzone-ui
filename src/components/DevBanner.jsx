import { useEffect, useState } from "react";

export default function DevBanner() {
  const [token, setToken] = useState("—");

  useEffect(() => {
    try {
      const tg = window?.Telegram?.WebApp;
      const data = tg?.initData;
      setToken(data && data.length > 0 ? data : "No initData (not inside Telegram)");
    } catch {
      setToken("Error reading initData");
    }
  }, []);

  return (
    <div className="w-full bg-[#1a1033] border-b border-purple/30 px-3 py-1.5 flex items-start gap-2 z-50">
      <span className="text-purple font-semibold text-[10px] shrink-0 mt-[1px] font-syne">TG Token:</span>
      <span className="text-[10px] text-slate-300 break-all leading-tight line-clamp-2 font-mono">
        {token}
      </span>
    </div>
  );
}
