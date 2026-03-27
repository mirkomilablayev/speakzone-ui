import { useState, useRef } from "react";
import DevBanner from "./components/DevBanner";
import BottomNav from "./components/BottomNav";
import HomeTab from "./components/tabs/HomeTab";
import MatchTab from "./components/tabs/MatchTab";
import IeltsTab from "./components/tabs/IeltsTab";
import ProgressTab from "./components/tabs/ProgressTab";
import RankTab from "./components/tabs/RankTab";
import SearchModal from "./components/modals/SearchModal";
import CallScreen from "./components/modals/CallScreen";

const TABS = {
  home:     HomeTab,
  match:    MatchTab,
  ielts:    IeltsTab,
  progress: ProgressTab,
  rank:     RankTab,
};

export default function App() {
  const [activeTab, setActiveTab]       = useState("home");
  const [searching,  setSearching]      = useState(false);
  const [inCall,     setInCall]         = useState(false);
  const prevTabRef = useRef("home");

  function openSearch() {
    setSearching(true);
  }

  function cancelSearch() {
    setSearching(false);
  }

  function onConnected() {
    setSearching(false);
    setInCall(true);
  }

  function endCall() {
    setInCall(false);
  }

  function handleTabChange(tab) {
    prevTabRef.current = activeTab;
    setActiveTab(tab);
  }

  const TabComponent = TABS[activeTab];

  return (
    <div className="flex items-center justify-center w-full h-dvh bg-[#060708]">
      {/* App Shell — max 430px, full dvh */}
      <div className="relative flex flex-col w-full max-w-app h-dvh bg-bg overflow-hidden">

        {/* Dev banner */}
        <DevBanner />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
          <div
            key={activeTab}
            className="animate-tab-in px-4 pt-4"
          >
            <TabComponent
              onStartSession={() => { handleTabChange("match"); openSearch(); }}
              onFindPartner={openSearch}
            />
          </div>
        </main>

        {/* Bottom Nav */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Search Modal */}
        <SearchModal open={searching} onCancel={cancelSearch} onConnected={onConnected} />

        {/* Call Screen */}
        <CallScreen open={inCall} onEnd={endCall} />
      </div>
    </div>
  );
}
