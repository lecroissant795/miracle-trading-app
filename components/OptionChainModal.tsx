import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Stock } from '../types';

interface OptionChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
}

const EXPIRATIONS = ['Nov 17', 'Nov 24', 'Dec 1', 'Dec 15', 'Jan 19', 'Mar 15'];

const OptionChainModal: React.FC<OptionChainModalProps> = ({ isOpen, onClose, stock }) => {
  const [selectedExpiry, setSelectedExpiry] = useState(EXPIRATIONS[2]);
  const [tab, setTab] = useState<'BOTH' | 'CALLS' | 'PUTS'>('BOTH');

  if (!isOpen) return null;

  // Generate mock strikes centered around the current stock price
  const basePrice = Math.floor(stock.price / 5) * 5;
  const strikes = Array.from({ length: 15 }, (_, i) => basePrice - 35 + (i * 5));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white z-10">
           <div>
             <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
               {stock.symbol} Option Chain
               <span className="px-2.5 py-1 bg-slate-100 text-xs rounded-lg text-slate-500 font-medium tracking-wide">NASDAQ</span>
             </h2>
             <div className="text-sm text-slate-500 mt-1 font-medium">
                Current: <span className="text-slate-900">${stock.price.toFixed(2)}</span>
                <span className={`ml-2 ${stock.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                </span>
             </div>
           </div>
           <button 
             onClick={onClose} 
             className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
           >
             <X size={22} />
           </button>
        </div>

        {/* Controls Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row items-center gap-4 bg-slate-50/50 flex-shrink-0">
           <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm whitespace-nowrap">
                    {EXPIRATIONS.map(exp => (
                        <button 
                            key={exp}
                            onClick={() => setSelectedExpiry(exp)}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${selectedExpiry === exp ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        >
                            {exp}
                        </button>
                    ))}
                </div>
           </div>
           
           <div className="hidden md:block flex-1"></div>
           
           <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-full md:w-auto">
              {(['CALLS', 'BOTH', 'PUTS'] as const).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTab(t)} 
                    className={`flex-1 md:flex-none px-6 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t.charAt(0) + t.slice(1).toLowerCase()}
                  </button>
              ))}
           </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-11 bg-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200 py-3 text-center flex-shrink-0 select-none">
           <div className="col-span-5 grid grid-cols-3 pl-4">
              <div className={`${tab === 'PUTS' ? 'invisible' : ''}`}>Bid</div>
              <div className={`${tab === 'PUTS' ? 'invisible' : ''}`}>Ask</div>
              <div className={`${tab === 'PUTS' ? 'invisible' : ''}`}>Last</div>
           </div>
           <div className="col-span-1 text-slate-900">Strike</div>
           <div className="col-span-5 grid grid-cols-3 pr-4">
              <div className={`${tab === 'CALLS' ? 'invisible' : ''}`}>Bid</div>
              <div className={`${tab === 'CALLS' ? 'invisible' : ''}`}>Ask</div>
              <div className={`${tab === 'CALLS' ? 'invisible' : ''}`}>Last</div>
           </div>
        </div>

        {/* Table Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-white">
            {strikes.map((strike, i) => {
                // Mock logic to simulate option pricing
                const dist = stock.price - strike;
                const timeValue = Math.max(0, 10 - Math.abs(dist) * 0.1) + Math.random();
                
                // Call Price
                const intrinsicCall = Math.max(0, stock.price - strike);
                const callPrice = intrinsicCall + timeValue;
                
                // Put Price
                const intrinsicPut = Math.max(0, strike - stock.price);
                const putPrice = intrinsicPut + timeValue;

                const isITMCall = stock.price > strike;
                const isITMPut = stock.price < strike;
                const isATM = Math.abs(stock.price - strike) < 2.5;

                return (
                    <div key={strike} className={`grid grid-cols-11 text-sm border-b border-slate-100 hover:bg-blue-50/30 transition-colors group ${isATM ? 'bg-blue-50/10' : ''}`}>
                        
                        {/* CALLS (Left Side) */}
                        <div className={`col-span-5 grid grid-cols-3 text-center py-3.5 pl-4 border-r border-slate-100 ${isITMCall ? 'bg-indigo-50/30' : ''} ${tab === 'PUTS' ? 'opacity-10 blur-[1px]' : ''}`}>
                            <div className="text-slate-400 font-mono">{(callPrice * 0.98).toFixed(2)}</div>
                            <div className="text-emerald-600 font-bold font-mono cursor-pointer hover:bg-emerald-100 rounded px-1 transition-colors">{(callPrice * 1.02).toFixed(2)}</div>
                            <div className="text-slate-600 font-mono">{callPrice.toFixed(2)}</div>
                        </div>

                        {/* STRIKE (Center) */}
                        <div className={`col-span-1 flex items-center justify-center font-bold text-slate-800 text-sm relative ${isATM ? 'bg-slate-100 text-blue-600' : 'bg-slate-50'}`}>
                           {strike}
                           {isATM && <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full -left-0.5 top-1/2 -translate-y-1/2"></div>}
                        </div>

                        {/* PUTS (Right Side) */}
                        <div className={`col-span-5 grid grid-cols-3 text-center py-3.5 pr-4 border-l border-slate-100 ${isITMPut ? 'bg-indigo-50/30' : ''} ${tab === 'CALLS' ? 'opacity-10 blur-[1px]' : ''}`}>
                            <div className="text-slate-400 font-mono">{(putPrice * 0.98).toFixed(2)}</div>
                            <div className="text-emerald-600 font-bold font-mono cursor-pointer hover:bg-emerald-100 rounded px-1 transition-colors">{(putPrice * 1.02).toFixed(2)}</div>
                            <div className="text-slate-600 font-mono">{putPrice.toFixed(2)}</div>
                        </div>
                    </div>
                )
            })}
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>Prices delayed by 15 mins</span>
            <span>Options trading involves significant risk.</span>
        </div>
      </div>
    </div>
  );
};

export default OptionChainModal;
