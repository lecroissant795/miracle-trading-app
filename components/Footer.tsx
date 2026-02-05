import React from 'react';
import { Mail, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: any, category?: string) => void;
  isLoggedIn?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <footer className="bg-slate-50 text-slate-900 pt-16 pb-10 px-6 mt-0 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Logo showText={true} />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-sm">
              A modern platform for thoughtful investors. Miracle combines intelligent tools, deep market access, and bank‑grade security in a single experience.
            </p>
            <div className="space-y-3 pt-1 text-xs md:text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-400" />
                <span>support@miracle-trade.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-400" />
                <span>Hanoi, Vietnam</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2 text-slate-400">
              {/* Social icons */}
              <button className="h-9 w-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm" aria-label="Visit Miracle on Facebook">
                <Facebook size={18} />
              </button>
              <button className="h-9 w-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm" aria-label="Visit Miracle on Instagram">
                <Instagram size={18} />
              </button>
              <button className="h-9 w-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center transition-colors shadow-sm" aria-label="Visit Miracle on YouTube">
                <Youtube size={18} />
              </button>
            </div>
          </div>

          {/* Platform Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('LANDING')} className="hover:text-slate-50 transition-colors text-left">Home</button></li>
              <li><button onClick={() => onNavigate(isLoggedIn ? 'DASHBOARD' : 'MARKET_EXPLORER')} className="hover:text-slate-50 transition-colors text-left">Market</button></li>
              <li><button onClick={() => onNavigate('PORTFOLIO')} className="hover:text-slate-50 transition-colors text-left">Portfolio</button></li>
            </ul>
          </div>

          {/* Information Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Information</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button className="hover:text-slate-50 transition-colors text-left">About us</button></li>
              <li><button className="hover:text-slate-50 transition-colors text-left">How it works</button></li>
              <li><button onClick={() => onNavigate('SUPPORT_PUBLIC')} className="hover:text-slate-50 transition-colors text-left">Support center</button></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button className="hover:text-slate-50 transition-colors text-left">Terms of service</button></li>
              <li><button className="hover:text-slate-50 transition-colors text-left">Privacy policy</button></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Stay in the loop</h4>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm">
              Get product updates, market insights, and security tips delivered straight to your inbox. No spam, ever.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-14 text-xs md:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 shadow-sm"
              />
              <button className="absolute right-1.5 top-1.5 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-400 transition-colors flex items-center justify-center shadow-sm shadow-blue-900/40">
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
              By subscribing you agree to our Privacy Policy and consent to receive Miracle communications.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-slate-200 pt-6 text-[11px] md:text-xs text-slate-500">
          <p>
            © 2025 Miracle. All rights reserved. Miracle is a design prototype and does not provide investment advice.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="hover:text-slate-900">Status</button>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <button className="hover:text-slate-900">Cookies</button>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <button className="hover:text-slate-900">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
