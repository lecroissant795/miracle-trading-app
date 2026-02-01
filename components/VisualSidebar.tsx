import React from 'react';
import { PieChart, Shield, Zap, TrendingUp, BrainCircuit, RefreshCw, Check, ArrowRight } from 'lucide-react';

export const VisualSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#0b1121] relative overflow-hidden p-12 text-white">
      {/* Background Decor - Deep & Institutional */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Main "Wealth Engine" Card */}
        <div className="bg-[#151e32] border border-slate-700/50 rounded-2xl p-6 shadow-2xl mb-8 animate-float relative overflow-hidden">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6 border-b border-slate-700/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 miracle-glow">
                <BrainCircuit className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white leading-tight">Miracle Advisor</h3>
                <p className="text-xs text-blue-300 font-medium">Institutional Engine v4.0</p>
              </div>
            </div>
            <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
              Auto-Pilot On
            </div>
          </div>

          {/* Portfolio Allocation Visual */}
          <div className="space-y-5">
             <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-slate-400 font-medium">Strategic Allocation</span>
                <span className="text-xs text-slate-500">Risk Profile: <span className="text-white">Aggressive Growth</span></span>
             </div>

             {/* Asset Class 1 */}
             <div className="group">
                <div className="flex justify-between text-xs mb-1.5">
                   <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Global Equities
                   </span>
                   <span className="text-slate-400">Target: 60%</span>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[58%]"></div>
                </div>
             </div>

             {/* Asset Class 2 - With AI Action */}
             <div className="group">
                <div className="flex justify-between text-xs mb-1.5">
                   <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span> Emerging Tech
                   </span>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400 flex items-center animate-pulse">
                         <RefreshCw className="w-3 h-3 mr-1" /> Rebalancing
                      </span>
                      <span className="text-slate-400">Target: 25%</span>
                   </div>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden relative">
                   <div className="h-full bg-purple-500 w-[28%] absolute top-0 left-0 opacity-50"></div>
                   <div className="h-full bg-purple-500 w-[25%] absolute top-0 left-0 z-10"></div>
                </div>
             </div>

             {/* Asset Class 3 */}
             <div className="group">
                <div className="flex justify-between text-xs mb-1.5">
                   <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span> Fixed Income
                   </span>
                   <span className="text-slate-400">Target: 15%</span>
                </div>
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 w-[15%]"></div>
                </div>
             </div>
          </div>

          {/* Metrics Footer */}
          <div className="mt-6 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4">
             <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Proj. Yield (APY)</p>
                <p className="text-lg font-bold text-white flex items-center gap-1">
                   12.8% <TrendingUp className="w-3 h-3 text-emerald-400" />
                </p>
             </div>
             <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Sharpe Ratio</p>
                <p className="text-lg font-bold text-white">2.45</p>
             </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-6 mt-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Institutional power.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Personalized for you.</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm mx-auto">
            Get the same AI-driven portfolio management used by hedge funds. Automatic rebalancing, tax optimization, and risk control.
          </p>
        </div>
      </div>
    </div>
  );
};
