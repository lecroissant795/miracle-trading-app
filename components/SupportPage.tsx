import React, { useState } from 'react';
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  Shield,
  User,
  TrendingUp,
  CreditCard,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Button from './Button';
import Logo from './Logo';
import Footer from './Footer';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../services/LanguageContext';

interface SupportPageProps {
  onNavigate: (view: any, category?: string) => void;
  isLoggedIn?: boolean;
  netWorth: number;
}

const SupportPage: React.FC<SupportPageProps> = ({ onNavigate, isLoggedIn }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const topics = [
    {
      icon: User,
      title: t.support.topics.account.title,
      description: t.support.topics.account.desc,
    },
    {
      icon: TrendingUp,
      title: t.support.topics.trading.title,
      description: t.support.topics.trading.desc,
    },
    {
      icon: CreditCard,
      title: t.support.topics.deposits.title,
      description: t.support.topics.deposits.desc,
    },
    {
      icon: Shield,
      title: t.support.topics.security.title,
      description: t.support.topics.security.desc,
    },
  ];

  const faqs = [
    {
      q: t.landing.faq1Q,
      a: t.landing.faq1A,
    },
    {
      q: t.landing.faq2Q,
      a: t.landing.faq2A,
    },
    {
      q: t.landing.faq3Q,
      a: t.landing.faq2A, // Reuse for demo
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => onNavigate('LANDING')}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('LANDING')}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              {t.nav.market}
            </button>
            <button
              onClick={() => onNavigate('PORTFOLIO')}
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => onNavigate('SUPPORT_PUBLIC')}
              className="text-sm font-semibold text-blue-600 transition-colors"
            >
              {t.nav.support}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            {isLoggedIn ? (
              <Button onClick={() => onNavigate('DASHBOARD')} className="px-6 py-2.5 rounded-full">
                {t.nav.dashboard}
              </Button>
            ) : (
              <>
                <button onClick={() => onNavigate('AUTH', 'SIGNUP')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-4 py-2">
                  {t.nav.signin}
                </button>
                <Button onClick={() => onNavigate('AUTH', 'LOGIN')} className="px-6 py-2.5 rounded-full">
                  {t.nav.login}
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 py-10 space-y-12">
          {/* Hero + Search */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] gap-8 items-stretch">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-10 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-10 w-72 h-72 bg-indigo-500/25 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100 border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t.support.badge}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {t.support.title}
                </h1>
                <p className="text-slate-200 text-sm md:text-base max-w-md">
                  {t.support.subtitle}
                </p>

                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t.support.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white text-slate-900 rounded-2xl py-3.5 pl-12 pr-4 shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
                    <span className="text-slate-400 mr-1">Popular:</span>
                    {['Account', 'Trading', 'Deposits', 'Security'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick help / status */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle size={18} className="text-blue-600" />
                    {t.stockDetail.needQuickHelp}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t.stockDetail.online}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.16em] mb-1">
                      {t.stockDetail.supportCoverage}
                    </p>
                    <p className="text-lg font-bold text-slate-900">{t.stockDetail.global247}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="text-[10px] text-slate-400">{t.stockDetail.avgResponse}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {t.stockDetail.responseChat}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle size={18} />
                      {t.stockDetail.startLiveChat}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      {t.stockDetail.emailSupport}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.stockDetail.emailResponse}</span>
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={16} />
                      {t.stockDetail.requestCall}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.stockDetail.monFriHours}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-4 text-sm text-slate-600 flex items-start gap-3">
                <Shield size={18} className="text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{t.stockDetail.allSystemsOperational}</p>
                  <p className="text-xs text-slate-500">
                    {t.stockDetail.noIncidents}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Topics */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{t.stockDetail.browseByTopic}</h2>
              <button
                type="button"
                onClick={() => onNavigate('SUPPORT')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                {t.stockDetail.openFullHelp}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols4 gap-6">
              {topics.map((topic) => (
                <button
                  key={topic.title}
                  type="button"
                  onClick={() => onNavigate('SUPPORT')}
                  className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <topic.icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm">{topic.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{topic.description}</p>
                  <span className="text-[11px] font-semibold text-blue-600 inline-flex items-center gap-1">
                    {t.stockDetail.viewArticles}
                    <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* FAQs + Security */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] gap-10 items-start">
             <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">{t.support.commonQuestions}</h2>
              <div className="space-y-3">
                {faqs.map((item) => (
                  <div
                    key={item.q}
                    className="bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <p className="text-sm font-semibold text-slate-900 mb-1">{item.q}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('SUPPORT')}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                {t.support.viewAllFaqs}
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="space-y-4 lg:mt-6">
              <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    <div>
                      <h3 className="text-sm font-semibold">{t.stockDetail.securityCompliance}</h3>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {t.stockDetail.builtWithSafeguards}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {t.stockDetail.alwaysOn}
                  </span>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-50">{t.stockDetail.protectedCustody}</p>
                      <p className="text-slate-300/80">
                        {t.stockDetail.protectedCustodyDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-50">{t.stockDetail.encryptedEverywhere}</p>
                      <p className="text-slate-300/80">
                        {t.stockDetail.encryptedEverywhereDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-50">{t.stockDetail.continuousMonitoring}</p>
                      <p className="text-slate-300/80">
                        {t.stockDetail.continuousMonitoringDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-200 hover:text-white/90"
                >
                  {t.stockDetail.viewSecurityOverview}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default SupportPage;
