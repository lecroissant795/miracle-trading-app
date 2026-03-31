
import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Lock, Globe, ShieldCheck, ChevronDown, User, Wallet, TrendingUp, BarChart3 } from 'lucide-react';
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

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

// --- Scroll-triggered section wrapper ---
const Section: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } } }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Marquee Component ---
const partners = [
  { name: 'Aurora Vault', role: 'Custody' },
  { name: 'Nexus Capital', role: 'Brokerage' },
  { name: 'Omega Clear', role: 'Clearing' },
  { name: 'Northbridge Bank', role: 'Banking' },
  { name: 'Atlas Markets', role: 'Execution' },
  { name: 'Helix Trust', role: 'Custodian' },
  { name: 'Crest Finance', role: 'Settlement' },
];

const PartnerCard: React.FC<{ p: { name: string; role: string } }> = ({ p }) => (
  <div className="min-w-[190px] flex-shrink-0 rounded-2xl border border-slate-100 bg-white px-5 py-4 flex items-center gap-3 shadow-sm mx-2.5">
    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-500 flex items-center justify-center text-[10px] font-black tracking-[0.18em] text-white">
      {p.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-700">{p.name}</span>
      <span className="text-[11px] text-slate-400">{p.role}</span>
    </div>
  </div>
);

const Marquee: React.FC = () => {
  const doubled = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex"
        animate={{ x: [0, -((190 + 20) * partners.length)] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((p, i) => <PartnerCard key={i} p={p} />)}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isLoggedIn }) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)']);
  const navShadow = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 1px 24px 0 rgba(0,0,0,0.06)']);

  const faqs = [
    { q: t.landing.faq1Q, a: t.landing.faq1A },
    { q: t.landing.faq2Q, a: t.landing.faq2A },
    { q: t.landing.faq3Q, a: t.landing.faq3A },
    { q: t.landing.faq4Q, a: t.landing.faq4A },
    { q: t.landing.faq5Q, a: t.landing.faq5A },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

      {/* ─── Navigation ─────────────────────────────────────────── */}
      <motion.nav
        className="fixed w-full z-50 backdrop-blur-md"
        style={{ backgroundColor: navBg, boxShadow: navShadow }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
            <Logo />
          </div>
          <div className="hidden md:flex items-center bg-slate-100/80 px-1.5 py-1.5 rounded-full">
            <button onClick={() => onNavigate('LANDING')} className="px-6 py-2 text-sm font-semibold text-slate-900 bg-white shadow-sm rounded-full">{t.nav.home}</button>
            <button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.market}</button>
            <button onClick={() => onNavigate('PORTFOLIO')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => onNavigate('SUPPORT_PUBLIC')} className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">{t.nav.support}</button>
          </div>
          <div className="flex items-center gap-5">
            <LanguageSelector />
            <button onClick={() => onNavigate('AUTH', 'LOGIN')} className="hidden md:block text-sm font-bold text-slate-900 hover:text-slate-600 transition-colors">{t.nav.login}</button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="px-7 py-2.5 rounded-full bg-black text-white hover:bg-slate-800 font-bold shadow-none text-sm">{t.nav.signup}</Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero Section ───────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-28 px-6 overflow-hidden">
        {/* Ambient background blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="pointer-events-none absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-indigo-400/8 blur-[100px]" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <motion.div
            className="flex-[1.2] text-center lg:text-left space-y-7"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp size={12} strokeWidth={3} /> {t.hero.badge}
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-[760px]">
              {t.hero.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => onNavigate('AUTH', 'SIGNUP')} className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-200/60 w-full sm:w-auto h-auto">
                  {t.hero.getStarted}
                </Button>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('MARKET_EXPLORER')}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-200/60 w-full sm:w-auto h-auto"
              >
                {t.hero.demo}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — Hero Card */}
          <motion.div
            className="flex-1 w-full relative"
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative bg-white rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(59,130,246,0.15)] border border-blue-100 w-full max-w-md mx-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="text-sm font-bold text-slate-400 mb-1">{t.stockDetail.portfolioValue}</div>
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight">$124,500.00</div>
                </div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  <TrendingUp size={12} /> 19%
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { name: 'Apple Inc.', ticker: 'AAPL', price: '$189.80', pct: '+1.2%' },
                  { name: 'Microsoft', ticker: 'MSFT', price: '$452.12', pct: '+0.8%' },
                  { name: 'Nvidia', ticker: 'NVDA', price: '$945.30', pct: '+3.5%' },
                ].map((stock, i) => (
                  <motion.div
                    key={stock.ticker}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
                      {stock.ticker.slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 text-sm">{stock.name}</div>
                      <div className="text-xs font-bold text-slate-400">{stock.ticker}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-sm">{stock.price}</div>
                      <div className="text-xs font-bold text-blue-600">{stock.pct}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-500/6 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ─── Trusted Partners (Marquee) ─────────────────────────── */}
      <section className="py-16 px-6 bg-white border-y border-slate-100">
        <Section className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t.landing.trustedNetwork}
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{t.landing.partnerEco}</h2>
              <p className="mt-2 text-sm md:text-base text-slate-500 max-w-xl">{t.landing.partnerDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-600">
              {[
                { color: 'bg-emerald-500', label: t.landing.custodyPartners },
                { color: 'bg-blue-500', label: t.landing.liquidityVenues },
                { color: 'bg-amber-400', label: t.landing.monitoring },
              ].map(b => (
                <div key={b.label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${b.color}`} />
                  <span className="font-semibold tracking-[0.16em] uppercase">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <Marquee />
          <p className="text-[11px] text-slate-400 text-center">{t.landing.illustrative}</p>
        </Section>
      </section>

      {/* ─── Mission Section ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          <Section className="flex flex-col md:flex-row items-center gap-16">
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 200 }}>
              <img src={missionImage} alt="Miracle portfolio dashboard on a tablet" className="rounded-3xl shadow-2xl shadow-slate-200/80 w-full" />
            </motion.div>
            <div className="flex-1">
              <div className="inline-flex items-center px-4 py-1.5 mb-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">{t.landing.ourMission}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{t.landing.missionTitle}</h2>
              <p className="text-slate-500 leading-relaxed mb-6 text-lg">{t.landing.missionDesc1}</p>
              <p className="text-slate-500 leading-relaxed text-lg">{t.landing.missionDesc2}</p>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center pb-4">
            {[
              { icon: <Globe size={24} />, label: t.common.globalAccess, desc: t.common.globalAccessDesc },
              { icon: <span className="font-bold text-2xl">$</span>, label: t.common.lowFees, desc: t.common.lowFeesDesc },
              { icon: <TrendingUp size={24} />, label: t.common.security, desc: t.common.securityDesc },
            ].map((item, i) => (
              <Section key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }} className="flex flex-col items-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-5">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Market Overview ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-100">
        <Section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t.landing.marketOverview}</h2>
            <p className="text-slate-500 mb-10 max-w-md text-base leading-relaxed">{t.landing.investNoBorders}</p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Button onClick={() => onNavigate('MARKET_EXPLORER')} className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold">{t.landing.exploreMarkets}</Button>
            </motion.div>
          </div>
          <div className="flex-1 w-full bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-xl font-bold text-slate-900 mb-0.5">Vanguard S&P 500 ETF</div>
                <div className="text-base text-slate-500 font-medium">VOO · Index Fund</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900 mb-1">$452.12</div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">+2.45%</div>
              </div>
            </div>
            <div className="h-56 w-full bg-blue-50/20 rounded-xl relative overflow-hidden border border-blue-100/50">
              <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,100 C50,80 80,120 120,60 S180,40 220,70 S300,20 400,10 L400,150 L0,150 Z" fill="url(#chartGradient)" />
                <motion.path
                  d="M0,100 C50,80 80,120 120,60 S180,40 220,70 S300,20 400,10"
                  fill="none" stroke="#3b82f6" strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <circle cx="400" cy="10" r="4" fill="#3b82f6" className="animate-pulse" />
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest px-1">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
            </div>
          </div>
        </Section>
      </section>

      {/* ─── Market Data Section ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <Section className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">{t.landing.marketDataTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
            {t.landing.marketDataBullets.map((bullet, i) => (
              <Section key={i} delay={i * 0.07}>
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-3 bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">{bullet}</p>
                </motion.div>
              </Section>
            ))}
          </div>
          <div className="grid max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex justify-center sm:justify-end">
              <Button size="lg" onClick={() => onNavigate('MARKET_EXPLORER')} className="w-full sm:w-[220px] px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-center">
                {t.landing.seeDataCoverage}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex justify-center sm:justify-start">
              <Button size="lg" onClick={() => onNavigate('MARKET_EXPLORER')} className="w-full sm:w-[220px] px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold text-center">
                {t.landing.tryLiveDemo}
              </Button>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* ─── Steps Section ───────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <Section className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight">{t.landing.startInMinutes}</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto text-base leading-relaxed font-medium">{t.landing.joinTraders}</p>

          <div className="relative flex flex-col md:flex-row justify-between items-start gap-14 md:gap-0 max-w-5xl mx-auto mb-14">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] border-t border-dashed border-blue-300 -z-0" />
            {[
              { icon: <User size={32} className="text-blue-600" />, step: t.landing.step1, desc: t.landing.step1Desc },
              { icon: <Wallet size={32} className="text-blue-600" />, step: t.landing.step2, desc: t.landing.step2Desc },
              { icon: <BarChart3 size={32} className="text-blue-600" />, step: t.landing.step3, desc: t.landing.step3Desc },
            ].map((s, i) => (
              <Section key={i} delay={i * 0.15} className="relative flex-1 flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.08, y: -4 }} transition={{ type: 'spring', stiffness: 260 }} className="mb-8 relative">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_15px_40px_-10px_rgba(59,130,246,0.18)] flex items-center justify-center border border-slate-100">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#ccff00] text-slate-900 text-sm font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white">{i + 1}</div>
                </motion.div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{s.step}</h3>
                <p className="text-slate-400 max-w-[240px] leading-relaxed font-medium text-sm">{s.desc}</p>
              </Section>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 pt-6">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="px-12 py-4 rounded-2xl bg-[#4361EE] hover:bg-[#3b51d4] text-white font-bold text-base shadow-xl shadow-blue-200 w-full sm:w-auto h-auto transition-all">
                {t.landing.createFree}
              </Button>
            </motion.div>
            <p className="text-sm text-slate-400 font-bold">{t.landing.noHiddenFees}</p>
            <p className="text-xs text-slate-500 font-medium bg-blue-50 px-4 py-2 rounded-full">{t.landing.tradingHours}</p>
          </div>
        </Section>
      </section>
      
      {/* ─── FAQ Section ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <Section className="max-w-6xl mx-auto">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{t.landing.faqs}</h2>
              <p className="text-slate-500 mb-7 text-sm md:text-base max-w-md">{t.landing.cantFind}</p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button onClick={() => onNavigate('SUPPORT_PUBLIC')} variant="primary" className="rounded-full px-6 py-2.5 text-sm font-semibold">
                  {t.landing.contactSupport}
                </Button>
              </motion.div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  layout
                  className={`rounded-2xl border px-5 py-4 cursor-pointer transition-colors ${openFaq === i ? 'border-blue-200 bg-blue-50/70' : 'border-slate-100 bg-slate-50/80 hover:border-blue-200 hover:bg-white'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">{faq.q}</p>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-xs md:text-[13px] text-slate-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;
