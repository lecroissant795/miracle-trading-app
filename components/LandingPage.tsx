
import React from 'react';
import { ArrowRight, Lock, Globe, ShieldCheck, ChevronDown, User, Wallet, TrendingUp, Search, PlayCircle, BarChart3 } from 'lucide-react';
import missionImage from '../resources/image.png';
import Button from './Button';
import Logo from './Logo';
import Footer from './Footer';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../services/LanguageContext';

interface LandingPageProps {
  onNavigate: (view: any, category?: string) => void;
  isLoggedIn?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isLoggedIn }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
                <Logo />
            </div>

            {/* Middle Links (Pill Shape) */}
            <div className="hidden md:flex items-center bg-slate-100/80 px-1.5 py-1.5 rounded-full">
                <button onClick={() => onNavigate('LANDING')} className="px-6 py-2 text-sm font-semibold text-slate-900 bg-white shadow-sm rounded-full transition-all">{t.nav.home}</button>
                <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.market}</button>
                <button onClick={() => onNavigate('PORTFOLIO')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.portfolio}</button>
                <button onClick={() => onNavigate('SUPPORT_PUBLIC')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.support}</button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6">
                <LanguageSelector />
                <button 
                  onClick={() => onNavigate('AUTH', 'LOGIN')}
                  className="hidden md:block text-sm font-bold text-slate-900 hover:text-slate-700"
                >
                  {t.nav.login}
                </button>
                <Button 
                  onClick={() => onNavigate('AUTH', 'SIGNUP')} 
                  className="px-8 py-3 rounded-full bg-black text-white hover:bg-slate-800 font-bold shadow-None"
                >
                    {t.nav.signup}
                </Button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-56 pb-40 lg:pt-64 lg:pb-48 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
              
              {/* Left Content */}
              <div className="flex-[1.2] text-center lg:text-left space-y-8 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                      <TrendingUp size={12} strokeWidth={3} /> {t.hero.badge}
                  </div>
                  
                  <h1 className="text-5xl md:text-[5rem] font-bold text-slate-900 leading-[1.1] tracking-tight max-w-[850px]">
                      {t.hero.title.split(',')[0]},<br />
                      {t.hero.title.split(',')[1]}
                  </h1>
                  
                  <p className="text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                      {t.hero.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4">
                      <Button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-200/50 w-full sm:w-auto h-auto">
                          {t.hero.getStarted}
                      </Button>
                      <button onClick={() => onNavigate('MARKET_EXPLORER')} className="px-8 py-4 rounded-lg bg-white border-2 border-blue-600 text-blue-600 font-bold text-base hover:bg-blue-50 transition-colors w-full sm:w-auto">
                          {t.hero.demo}
                      </button>
                  </div>
              </div>

              {/* Right Content (Hero Card) */}
              <div className="flex-1 w-full relative hero-perspective animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                   {/* Main Portfolio Card */}
                   <div className="relative bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-blue-200 w-full max-w-md mx-auto hero-card">
                       <div className="flex justify-between items-start mb-10">
                           <div>
                               <div className="text-sm font-bold text-slate-400 mb-1">{t.stockDetail.portfolioValue}</div>
                               <div className="text-4xl font-extrabold text-slate-900 tracking-tight">$124,500.00</div>
                           </div>
                           <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                               <TrendingUp size={12} /> 19%
                           </div>
                       </div>
                       
                       <div className="space-y-6">
                           {/* Apple Item */}
                           <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                               <div className="flex-1">
                                   <div className="font-bold text-slate-900">Apple Inc.</div>
                                   <div className="text-xs font-bold text-slate-400">AAPL</div>
                               </div>
                               <div className="text-right">
                                   <div className="font-bold text-slate-900">$189.80</div>
                                   <div className="text-xs font-bold text-blue-600">+1.2%</div>
                               </div>
                           </div>
                           
                           {/* Microsoft Item */}
                           <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                               <div className="flex-1">
                                   <div className="font-bold text-slate-900">Microsoft</div>
                                   <div className="text-xs font-bold text-slate-400">MSFT</div>
                               </div>
                               <div className="text-right">
                                   <div className="font-bold text-slate-900">$452.12</div>
                                   <div className="text-xs font-bold text-blue-600">+0.8%</div>
                               </div>
                           </div>
                           
                           {/* Nvidia Item */}
                           <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                               <div className="flex-1">
                                   <div className="font-bold text-slate-900">Nvidea</div>
                                   <div className="text-xs font-bold text-slate-400">NVDA</div>
                               </div>
                               <div className="text-right">
                                   <div className="font-bold text-slate-900">$945.30</div>
                                   <div className="text-xs font-bold text-blue-600">+3.5%</div>
                               </div>
                           </div>
                       </div>
                   </div>
                   
                   {/* Background Glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
              </div>
          </div>
      </section>

      {/* Trusted partners */}
      <section className="py-16 px-6 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Heading + stats */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t.landing.trustedNetwork}
                        </p>
                        <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                            {t.landing.partnerEco}
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-500 max-w-xl">
                            {t.landing.partnerDesc}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-slate-600">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="font-semibold tracking-[0.16em] uppercase">{t.landing.custodyPartners}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="font-semibold tracking-[0.16em] uppercase">{t.landing.liquidityVenues}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span className="font-semibold tracking-[0.16em] uppercase">{t.landing.monitoring}</span>
                        </div>
                    </div>
                </div>

                {/* Logo row */}
                <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0">
                    {[
                        { name: 'Aurora Vault', role: t.stockDetail.roles.custody },
                        { name: 'Nexus Capital', role: t.stockDetail.roles.brokerage },
                        { name: 'Omega Clear', role: t.stockDetail.roles.clearing },
                        { name: 'Northbridge Bank', role: t.stockDetail.roles.banking },
                        { name: 'Atlas Markets', role: t.stockDetail.roles.execution },
                    ].map((p) => (
                        <div
                          key={p.name}
                          className="min-w-[180px] flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-center gap-3 shadow-sm hover:border-blue-200 hover:bg-white hover:shadow-md transition-colors"
                        >
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-500 flex items-center justify-center text-[10px] font-black tracking-[0.18em] text-white">
                                {p.name
                                  .split(' ')
                                  .map((w) => w[0])
                                  .join('')
                                  .slice(0, 3)
                                  .toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-700">
                                    {p.name}
                                </span>
                                <span className="text-[11px] text-slate-400">{p.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sub-copy */}
                <p className="text-[11px] md:text-xs text-slate-400 text-center md:text-left">
                    {t.landing.illustrative}
                </p>
            </div>
      </section>

      {/* Mission Section */}
      <section className="py-40 px-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto flex flex-col gap-24">
               <div className="flex flex-col md:flex-row items-center gap-16">
                   <div className="flex-1">
                       <img 
                         src={missionImage}
                         alt="Miracle portfolio dashboard on a tablet"
                         className="rounded-3xl shadow-2xl shadow-slate-200/80 w-full"
                       />
                   </div>
                   <div className="flex-1">
                       <div className="inline-flex items-center px-4 py-1.5 mb-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
                           {t.landing.ourMission}
                       </div>
                       <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                           {t.landing.missionTitle} <span className="text-blue-600">{t.landing.freedom}</span>
                       </h2>
                       <p className="text-slate-500 leading-relaxed mb-6 text-lg">
                           {t.landing.missionDesc1}
                       </p>
                       <p className="text-slate-500 leading-relaxed text-lg">
                           {t.landing.missionDesc2}
                       </p>
                   </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center pt-8 pb-12">
                   <div>
                       <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                           <span className="font-bold text-2xl">$</span>
                       </div>
                       <h4 className="font-bold text-slate-900 text-lg mb-2">{t.common.lowFees}</h4>
                       <p className="text-sm text-slate-500">{t.common.lowFeesDesc}</p>
                   </div>
                   <div>
                       <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                           <Globe size={24} />
                       </div>
                       <h4 className="font-bold text-slate-900 text-lg mb-2">{t.common.globalAccess}</h4>
                       <p className="text-sm text-slate-500">{t.common.globalAccessDesc}</p>
                   </div>
                   <div>
                       <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                           <Lock size={24} />
                       </div>
                       <h4 className="font-bold text-slate-900 text-lg mb-2">{t.common.security}</h4>
                       <p className="text-sm text-slate-500">{t.common.securityDesc}</p>
                   </div>
               </div>
          </div>
      </section>


      {/* Market Overview */}
      <section className="py-40 px-6 bg-slate-100">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.landing.marketOverview}</h2>
                    <p className="text-slate-500 mb-10 max-w-md text-base leading-relaxed">
                        {t.landing.investNoBorders}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => onNavigate('MARKET_EXPLORER')} className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold">
                            {t.landing.exploreMarkets}
                        </Button>
                    </div>
                </div>
               <div className="flex-1 w-full bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200/50">
                   <div className="flex justify-between items-center mb-8">
                       <div>
                           <div className="text-xl font-bold text-slate-900 mb-0.5">Vanguard S&P 500 ETF</div>
                           <div className="text-base text-slate-500 font-medium">VOO  b7 Index Fund</div>
                       </div>
                       <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 mb-0.5">$452.12</div>
                            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+2.45%</div>
                       </div>
                   </div>
                   {/* Fake Chart */}
                   <div className="h-64 w-full bg-blue-50/20 rounded-xl relative overflow-hidden border border-blue-100/50">
                        <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                            <path d="M0,100 C50,80 80,120 120,60 S180,40 220,70 S300,20 400,10 L400,150 L0,150 Z" fill="url(#chartGradient)" />
                            <path d="M0,100 C50,80 80,120 120,60 S180,40 220,70 S300,20 400,10" fill="none" stroke="#3b82f6" strokeWidth="3" />
                            {/* Animated circle indicator */}
                            <circle cx="400" cy="10" r="3" fill="#3b82f6" className="animate-pulse" />
                        </svg>
                   </div>
                   <div className="flex justify-between mt-5 text-xs text-slate-400 font-bold uppercase tracking-widest px-1">
                       <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                   </div>
               </div>
           </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 px-6 text-center">
          <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                  {t.landing.startInMinutes.split('minutes')[0]}<span className="text-[#4361EE]">{t.landing.startInMinutes.includes('phút') ? 'phút' : 'minutes'}</span>
              </h2>
              <p className="text-slate-500 mb-24 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                  {t.landing.joinTraders}
              </p>
              
              <div className="relative flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0 max-w-5xl mx-auto mb-20">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] border-t border-dashed border-blue-300 -z-0"></div>
                  
                  {/* Step 1 */}
                  <div className="relative flex-1 flex flex-col items-center">
                      <div className="mb-8 relative transition-transform hover:scale-105 duration-300">
                          <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)] flex items-center justify-center border border-slate-50">
                              <User size={32} className="text-[#3b82f6]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ccff00] text-slate-900 text-sm font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white">1</div>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-4">{t.landing.step1}</h3>
                      <p className="text-slate-400 max-w-[260px] leading-relaxed font-medium text-sm">
                          {t.common.lowFeesDesc}
                      </p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex-1 flex flex-col items-center">
                      <div className="mb-8 relative transition-transform hover:scale-105 duration-300">
                          <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)] flex items-center justify-center border border-slate-50">
                               <Wallet size={32} className="text-[#3b82f6]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ccff00] text-slate-900 text-sm font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white">2</div>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-4">{t.landing.step2}</h3>
                      <p className="text-slate-400 max-w-[260px] leading-relaxed font-medium text-sm">
                          {t.common.globalAccessDesc}
                      </p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex-1 flex flex-col items-center">
                      <div className="mb-8 relative transition-transform hover:scale-105 duration-300">
                          <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(59,130,246,0.15)] flex items-center justify-center border border-slate-50">
                              <BarChart3 size={32} className="text-[#3b82f6]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ccff00] text-slate-900 text-sm font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white">3</div>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-4">{t.landing.step3}</h3>
                      <p className="text-slate-400 max-w-[260px] leading-relaxed font-medium text-sm">
                           {t.common.securityDesc}
                      </p>
                  </div>
              </div>
              
              <div className="flex flex-col items-center gap-5 pt-8">
                  <Button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="px-12 py-4.5 rounded-2xl bg-[#4361EE] hover:bg-[#3b51d4] text-white font-bold text-base shadow-xl shadow-blue-200 w-full sm:w-auto h-auto transition-all">
                      {t.landing.createFree}
                  </Button>
                  <p className="text-sm text-slate-400 font-bold">{t.landing.noHiddenFees}</p>
              </div>
          </div>
      </section>

      {/* Security Section */}
      <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-8 py-10 md:px-12 md:py-14 text-slate-50">
                    {/* Decorative glows */}
                    <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

                    <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] items-center">
                        {/* Text + stats */}
                         <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200 border border-white/10 mb-4">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {t.landing.securityFirst}
                            </div>

                            <h2 className="text-3xl md:text-4xl font-semibold md:font-bold tracking-tight mb-4">
                                {t.landing.securityGuaranteed}
                            </h2>
                            <p className="text-sm md:text-base text-slate-200/80 max-w-xl mb-8 leading-relaxed">
                                {t.landing.securityTrust}
                            </p>

                            {/* Stats row */}
                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left text-xs md:text-sm">
                                <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                                    <div className="text-[11px] uppercase tracking-wide text-slate-300/80 mb-1">{t.landing.uptime}</div>
                                    <div className="text-lg font-semibold text-white">99.99%</div>
                                    <div className="text-[11px] text-slate-300 mt-1">{t.landing.monitored}</div>
                                </div>
                                <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                                    <div className="text-[11px] uppercase tracking-wide text-slate-300/80 mb-1">{t.landing.storage}</div>
                                    <div className="text-lg font-semibold text-white">{t.landing.offline}</div>
                                    <div className="text-[11px] text-slate-300 mt-1">{t.landing.coldWallet}</div>
                                </div>
                                <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/10 col-span-2 sm:col-span-1">
                                    <div className="text-[11px] uppercase tracking-wide text-slate-300/80 mb-1">{t.landing.compliance}</div>
                                    <div className="text-lg font-semibold text-white">{t.landing.soc2}</div>
                                    <div className="text-[11px] text-slate-300 mt-1">{t.landing.audits}</div>
                                </div>
                            </div>
                        </div>

                        {/* Feature cards */}
                        <div className="space-y-4">
                            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm flex gap-4 hover:bg-white/7.5 transition-colors">
                                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                                    <Lock size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1">{t.landing.multiLayer}</h3>
                                    <p className="text-xs md:text-[13px] text-slate-200/85 leading-relaxed">
                                        {t.landing.multiLayerDesc}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm flex gap-4 hover:bg-white/7.5 transition-colors">
                                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-200">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1">{t.landing.encryption}</h3>
                                    <p className="text-xs md:text-[13px] text-slate-200/85 leading-relaxed">
                                        {t.landing.encryptionDesc}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm flex gap-4 hover:bg-white/7.5 transition-colors">
                                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-200">
                                    <Globe size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white mb-1">{t.landing.safeguards}</h3>
                                    <p className="text-xs md:text-[13px] text-slate-200/85 leading-relaxed">
                                        {t.landing.safeguardsDesc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-start">
                     <div>
                         <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{t.landing.faqs}</h2>
                         <p className="text-slate-500 mb-7 text-sm md:text-base max-w-md">
                             {t.landing.cantFind}
                         </p>
                         <div className="flex flex-wrap items-center gap-4">
                             <Button onClick={() => onNavigate('SUPPORT_PUBLIC')} variant="primary" className="rounded-full px-6 py-2.5 text-sm font-semibold">
                                 {t.landing.contactSupport}
                             </Button>
                         </div>
                     </div>

                     {/* Simple FAQ list */}
                     <div className="space-y-3">
                         <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 md:px-5 md:py-4 cursor-pointer hover:border-blue-200 hover:bg-white transition-colors">
                             <div className="flex items-center justify-between gap-4">
                                 <div>
                                     <p className="text-sm font-semibold text-slate-900">{t.landing.faq1Q}</p>
                                     <p className="mt-1.5 text-xs text-slate-500 leading-relaxed hidden sm:block">
                                         {t.landing.faq1A}
                                     </p>
                                 </div>
                                 <ChevronDown size={16} className="text-slate-400" />
                             </div>
                         </div>

                         <div className="rounded-2xl border border-blue-200 bg-blue-50/70 px-4 py-3.5 md:px-5 md:py-4">
                                 <div className="flex items-center justify-between gap-4 mb-1">
                                     <p className="text-sm font-semibold text-slate-900">{t.landing.faq2Q}</p>
                                     <ChevronDown size={16} className="text-slate-500 rotate-180" />
                                 </div>
                                 <p className="text-xs md:text-[13px] text-slate-600 leading-relaxed">
                                     {t.landing.faq2A}
                                 </p>
                         </div>

                         <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 md:px-5 md:py-4 cursor-pointer hover:border-blue-200 hover:bg-white transition-colors">
                             <div className="flex items-center justify-between gap-4">
                                 <p className="text-sm font-semibold text-slate-900">{t.landing.faq3Q}</p>
                                 <ChevronDown size={16} className="text-slate-400" />
                             </div>
                         </div>
                     </div>
                </div>
            </div>
      </section>

      <Footer onNavigate={onNavigate} />

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default LandingPage;
