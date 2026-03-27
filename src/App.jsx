import { useState } from "react";
import DevBanner from "./components/DevBanner";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/tabs/HomeTab";
import PracticeTab from "./components/tabs/PracticeTab";
import MockTab from "./components/tabs/MockTab";
import ProfileTab from "./components/tabs/ProfileTab";
import PremiumModal from "./components/modals/PremiumModal";

const TABS = {
  home:     HomeTab,
  mock:     MockTab,
  practice: PracticeTab,
  profile:  ProfileTab,
};

import OnboardingFlow from "./components/onboarding/OnboardingFlow";

export default function App() {
  const [activeTab,  setActiveTab]  = useState("home");
  const [showPremium, setShowPremium] = useState(false);
  // Default to true as per previous user request
  const [onboarded, setOnboarded] = useState(true);

  const openPremium = () => setShowPremium(true);
  const closePremium = () => setShowPremium(false);

  const TabComponent = TABS[activeTab];

  if (!onboarded) {
    return <OnboardingFlow onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-bg text-white overflow-hidden"
         style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* App shell — 430px max, full dvh */}
      <div className="relative flex flex-col w-full max-w-app h-dvh bg-bg overflow-hidden border-x border-white/5">

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
          <div key={activeTab} className="animate-tab-in px-4 pt-4">
            <TabComponent
              onStartSession={() => setActiveTab("mock")}
              onGetPremium={openPremium}
              onOpenProfile={() => setActiveTab("profile")}
            />
          </div>
        </main>

        {/* Bottom Nav */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Overlays */}
        <PremiumModal open={showPremium} onClose={closePremium} />
      </div>
    </div>
  );
}
