const TG = typeof window !== "undefined" ? window.Telegram?.WebApp : null;

/**
 * Lightweight hook that wraps Telegram WebApp SDK.
 * Gracefully degrades — all functions are safe to call outside Telegram.
 */
export function useTelegram() {
  const user = TG?.initDataUnsafe?.user ?? {
    first_name: "Mirkomil",
    language_code: "uz",
  };

  /** Call on button taps, recording start/stop, exam submission */
  function hapticFeedback(type = "light") {
    try {
      if (!TG?.HapticFeedback) return;
      if (type === "impact")        TG.HapticFeedback.impactOccurred("medium");
      else if (type === "success")  TG.HapticFeedback.notificationOccurred("success");
      else if (type === "error")    TG.HapticFeedback.notificationOccurred("error");
      else                          TG.HapticFeedback.impactOccurred("light");
    } catch {}
  }

  /** Show the Telegram native back button and register a handler */
  function showBackButton(onBack) {
    try {
      if (!TG?.BackButton) return;
      TG.BackButton.show();
      TG.BackButton.onClick(onBack);
    } catch {}
  }

  /** Hide the Telegram back button and unregister handler */
  function hideBackButton() {
    try {
      if (!TG?.BackButton) return;
      TG.BackButton.hide();
      TG.BackButton.offClick();
    } catch {}
  }

  /** Sync Telegram color scheme to root element class */
  function themeSync() {
    try {
      if (!TG) return;
      document.documentElement.classList.toggle("tg-dark", TG.colorScheme === "dark");
    } catch {}
  }

  return { user, hapticFeedback, showBackButton, hideBackButton, themeSync };
}
