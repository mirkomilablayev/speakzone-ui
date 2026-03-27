import { useState, useEffect } from "react";
import Card from "../shared/Card";
import { PrimaryButton } from "../shared/Button";
import confetti from "canvas-confetti";

const REGIONS = [
  "Tashkent City", "Tashkent Region", "Samarkand", "Fergana", 
  "Namangan", "Andijan", "Bukhara", "Navoi", 
  "Kashkadarya", "Surkhandarya", "Jizzakh", "Khorezm", 
  "Syrdarya", "Republic of Karakalpakstan"
];

const SCORES = ["0", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Custom Calendar State
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(2000);

  // Form Data
  const [formData, setFormData] = useState({
    phone: "+998 90 123 45 67",
    agreed: false,
    username: "@mirkomil_speaks",
    fullName: "Mirkomil Zafarov",
    birthday: "1998-01-15",
    region: "",
    currentScore: 6, 
    targetScore: 9, 
  });

  const nextStep = () => {
    if (step < 7) {
      if (step === 6) {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      }
      setIsAnimating(true);
      setTimeout(() => {
        setStep(s => s + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(s => s - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("speakzone_onboarded", "true");
    onComplete();
  };

  const progress = (step / 6) * 100;

  const renderStep = () => {
    const commonClasses = `flex flex-col h-full gap-6 px-6 pt-6 transition-all duration-300 ${isAnimating ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}`;

    switch (step) {
      case 1:
        return (
          <div className={commonClasses}>
            <div className="flex flex-col items-center text-center gap-6 mt-12">
              <div className="w-20 h-20 rounded-full bg-primary-gradient flex items-center justify-center font-syne font-black text-white text-3xl shadow-primary-glow border-4 border-white/10 text-center leading-none pt-1">
                SZ
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-syne font-bold text-3xl text-white">Welcome to SpeakZone</h1>
                <p className="text-muted text-lg leading-relaxed">Practice IELTS Speaking with real people worldwide</p>
              </div>
            </div>
            <div className="mt-auto mb-10">
               <PrimaryButton onClick={nextStep}>Get Started →</PrimaryButton>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={commonClasses}>
            <div className="flex flex-col gap-2">
              <span className="text-4xl">📱</span>
              <h2 className="font-syne font-bold text-2xl text-white">Verify Your Number</h2>
              <p className="text-muted text-sm">We use your Telegram number to keep your account secure</p>
            </div>
            
            <div className="bg-card-raised border border-subtle p-5 rounded-xl2 text-slate-400 font-mono text-center select-none shadow-inner opacity-80">
              {formData.phone}
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mt-2">
              <input 
                type="checkbox" 
                checked={formData.agreed}
                onChange={e => setFormData({...formData, agreed: e.target.checked})}
                className="mt-1 w-5 h-5 rounded border-subtle bg-bg text-accent focus:ring-accent accent-accent"
              />
              <span className="text-xs text-muted leading-tight group-hover:text-slate-300 transition-colors">
                I agree to Terms of Service and Privacy Policy
              </span>
            </label>

            <div className="mt-auto mb-10">
               <PrimaryButton onClick={nextStep} disabled={!formData.agreed}>Confirm Number →</PrimaryButton>
            </div>
          </div>
        );

      case 3:
        const isUsernameValid = formData.username.length >= 5;
        return (
          <div className={commonClasses}>
            <div className="flex flex-col gap-2">
              <span className="text-4xl">🔖</span>
              <h2 className="font-syne font-bold text-2xl text-white">Choose Your Username</h2>
              <p className="text-muted text-sm">This is how other users will find you on SpeakZone</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="@your_username"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                className="w-full bg-card-raised border border-subtle px-5 py-4 rounded-xl2 text-white placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 {isUsernameValid ? (
                   <span className="w-6 h-6 bg-green/20 text-green rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                 ) : (
                   <span className="w-6 h-6 bg-red/20 text-red rounded-full flex items-center justify-center text-xs font-bold">✕</span>
                 )}
              </div>
            </div>
            
            <p className="text-[11px] text-muted -mt-2 ml-1">Only letters, numbers, and underscores. Min 4 chars.</p>

            <div className="mt-auto mb-10">
               <PrimaryButton onClick={nextStep} disabled={!isUsernameValid}>Continue →</PrimaryButton>
            </div>
          </div>
        );

      case 4:
        const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
        const startDay = new Date(calYear, calMonth, 1).getDay();
        const days = Array.from({ length: daysInMonth(calMonth, calYear) }, (_, i) => i + 1);
        
        const selectedDay = parseInt(formData.birthday.split("-")[2]);
        const selectedMonth = parseInt(formData.birthday.split("-")[1]) - 1;
        const selectedYear = parseInt(formData.birthday.split("-")[0]);

        return (
          <div className={commonClasses}>
            <div className="flex flex-col gap-1">
              <span className="text-4xl">👤</span>
              <h2 className="font-syne font-bold text-2xl text-white">Tell Us About You</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 px-1">
                <label className="text-[11px] text-muted font-bold uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-card-raised border border-subtle px-5 py-4 rounded-xl2 text-white placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-3 px-1">
                <label className="text-[11px] text-muted font-bold uppercase tracking-widest">Birthday</label>
                
                {/* Custom Styled Calendar */}
                <div className="bg-card-raised border border-subtle rounded-2xl overflow-hidden shadow-xl animate-scale-in">
                  <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex gap-2">
                      <select 
                        value={calMonth} 
                        onChange={e => setCalMonth(parseInt(e.target.value))}
                        className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                      >
                        {MONTH_NAMES.map((m, i) => <option key={m} value={i} className="bg-bg">{m}</option>)}
                      </select>
                      <select 
                        value={calYear} 
                        onChange={e => setCalYear(parseInt(e.target.value))}
                        className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                      >
                        {Array.from({ length: 110 }, (_, i) => 2024 - i).map(y => <option key={y} value={y} className="bg-bg">{y}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-3 grid grid-cols-7 gap-1 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <span key={d} className="text-[10px] font-bold text-muted uppercase pb-2">{d}</span>
                    ))}
                    {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                    {days.map(d => {
                      const isSelected = selectedDay === d && selectedMonth === calMonth && selectedYear === calYear;
                      return (
                        <button
                          key={d}
                          onClick={() => setFormData({...formData, birthday: `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2,'0')}`})}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                            isSelected 
                              ? "bg-primary-gradient text-white shadow-primary-glow scale-110 z-10" 
                              : "text-slate-400 hover:bg-white/5 active:scale-90"
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] text-muted">Selected:</span>
                  <span className="text-sm font-bold text-accent">{formData.birthday}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto mb-10 pt-2">
               <PrimaryButton onClick={nextStep} disabled={!formData.fullName || !formData.birthday}>Continue →</PrimaryButton>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={commonClasses}>
            <div className="flex flex-col gap-2">
              <span className="text-4xl">📍</span>
              <h2 className="font-syne font-bold text-2xl text-white">Where Are You From?</h2>
              <p className="text-muted text-sm">Select your region in Uzbekistan</p>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 -mr-1 hide-scrollbar">
               <div className="flex flex-col gap-2.5">
                  {REGIONS.map(r => (
                    <button
                      key={r}
                      onClick={() => setFormData({...formData, region: r})}
                      className={`w-full text-left px-5 py-4 rounded-xl2 border font-bold text-sm transition-all flex items-center justify-between ${
                        formData.region === r 
                          ? "bg-primary-gradient border-transparent text-white shadow-primary-glow"
                          : "bg-card-raised border-subtle text-slate-400 hover:border-subtle/80"
                      }`}
                    >
                      {r}
                      {formData.region === r && <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</span>}
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-4 mb-10">
               <PrimaryButton onClick={nextStep} disabled={!formData.region}>Continue →</PrimaryButton>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={commonClasses}>
            <div className="flex flex-col gap-2">
              <span className="text-4xl">🎯</span>
              <h2 className="font-syne font-bold text-2xl text-white">What's Your Target?</h2>
              <p className="text-muted text-sm">We'll match you with partners at the right level</p>
            </div>

            <div className="flex flex-col gap-8 mt-4">
               <div className="flex flex-col gap-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-syne font-black text-5xl text-accent">{SCORES[formData.currentScore]}</span>
                    <span className="text-[11px] text-muted font-bold uppercase tracking-widest mt-1">Current Score</span>
                  </div>
                  <input 
                    type="range" min="0" max={SCORES.length - 1} step="1"
                    value={formData.currentScore}
                    onChange={e => setFormData({...formData, currentScore: parseInt(e.target.value)})}
                    className="w-full accent-accent h-1.5 bg-card-raised rounded-full appearance-none cursor-pointer"
                  />
               </div>

               <div className="flex flex-col gap-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-syne font-black text-5xl text-purple">{SCORES[formData.targetScore]}</span>
                    <span className="text-[11px] text-muted font-bold uppercase tracking-widest mt-1">Target Score</span>
                  </div>
                  <input 
                    type="range" min="0" max={SCORES.length - 1} step="1"
                    value={formData.targetScore}
                    onChange={e => setFormData({...formData, targetScore: parseInt(e.target.value)})}
                    className="w-full accent-purple h-1.5 bg-card-raised rounded-full appearance-none cursor-pointer"
                  />
               </div>
            </div>

            <div className="mt-auto mb-10">
               <PrimaryButton onClick={nextStep}>Start Practicing 🎉</PrimaryButton>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center justify-center text-center gap-6 h-full px-6">
            <span className="text-7xl animate-bounce">🎉</span>
            <div className="flex flex-col gap-3">
              <h2 className="font-syne font-bold text-3xl text-white">You're all set, Mirkomil!</h2>
              <p className="text-muted text-lg">Let's start speaking!</p>
            </div>
            <div className="mt-12 w-full max-w-[280px]">
               <PrimaryButton onClick={handleFinish}>Start Now →</PrimaryButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-bg flex flex-col overflow-hidden" style={{ maxWidth: 430, margin: "0 auto" }}>
      {step < 7 && (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between h-8 relative">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className={`w-10 h-10 -ml-2 flex items-center justify-center text-white text-2xl active:scale-90 transition-all ${step === 1 ? "opacity-0 invisible" : "opacity-100 visible"}`}
            >
              ←
            </button>
            <span className="text-muted text-[11px] font-bold uppercase tracking-widest absolute right-0">Step {step} of 6</span>
          </div>
          
          <div className="w-full h-1.5 bg-card-raised rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-gradient transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {renderStep()}
      </div>
    </div>
  );
}
