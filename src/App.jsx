import { useState } from "react";
import DevBanner from "./components/DevBanner";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/tabs/HomeTab";
import PracticeTab from "./components/tabs/PracticeTab";
import MockTab from "./components/tabs/MockTab";
import ProfileTab from "./components/tabs/ProfileTab";
import SearchModal from "./components/modals/SearchModal";
import CallScreen from "./components/modals/CallScreen";
import PostCallRating from "./components/modals/PostCallRating";
import PremiumModal from "./components/modals/PremiumModal";
import ProfileScreen from "./components/modals/ProfileScreen";

const TABS = {
  home:     HomeTab,
  mock:     MockTab,
  practice: PracticeTab,
  profile:  ProfileTab,
};

import OnboardingFlow from "./components/onboarding/OnboardingFlow";

export default function App() {
  const [activeTab,  setActiveTab]  = useState("home");
  const [searching,  setSearching]  = useState(false);
  const [inCall,     setInCall]     = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  // For now, show onboarding EVERY TIME for testing
  const [onboarded, setOnboarded] = useState(true);

  const openSearch = () => setSearching(true);
  const cancelSearch = () => setSearching(false);

  const onConnected = () => {
    setSearching(false);
    setInCall(true);
  };

  const endCall = () => {
    setInCall(false);
    setShowRating(true);
  };

  const submitRating = () => {
    setShowRating(false);
    setActiveTab("home");
  };

  const skipRating = () => {
    setShowRating(false);
    setActiveTab("home");
  };

  const openPremium = () => setShowPremium(true);
  const closePremium = () => setShowPremium(false);

  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  const TabComponent = TABS[activeTab];

  if (!onboarded) {
    return <OnboardingFlow onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-bg text-white overflow-hidden"
         style={{ maxWidth: 430, margin: "0 auto" }}>
      {/* App shell — 430px max, full dvh */}
      <div className="relative flex flex-col w-full max-w-app h-dvh bg-bg overflow-hidden">

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
          <div key={activeTab} className="animate-tab-in px-4 pt-4">
            <TabComponent
              onStartSession={() => { setActiveTab("practice"); openSearch(); }}
              onFindPartner={openSearch}
              onGetPremium={openPremium}
              onOpenProfile={() => setActiveTab("profile")}
            />
          </div>
        </main>

        {/* Bottom Nav */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Overlays — rendered inside shell so they respect max-width */}
        <SearchModal open={searching}  onCancel={cancelSearch} onConnected={onConnected} />
        <CallScreen  open={inCall}     onEnd={endCall} />
        <PostCallRating open={showRating} onSubmit={submitRating} onSkip={skipRating} />
        <PremiumModal open={showPremium} onClose={closePremium} />
        <ProfileScreen open={showProfile} onClose={closeProfile} />
      </div>
    </div>
  );
}
