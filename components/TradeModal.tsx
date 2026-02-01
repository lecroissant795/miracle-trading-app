import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Stock, Portfolio } from '../types';
import Button from './Button';

interface TradeModalProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
  onTrade: (type: 'BUY' | 'SELL', quantity: number) => void;
  portfolio: Portfolio;
  initialSide?: 'BUY' | 'SELL';
}

const TradeModal: React.FC<TradeModalProps> = ({ stock, isOpen, onClose, onTrade, portfolio, initialSide = 'BUY' }) => {
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>(initialSide);
  const [quantity, setQuantity] = useState<number>(1);

  React.useEffect(() => {
    if (stock && isOpen) {
      setQuantity(1);
      setTradeType(initialSide);
    }
  }, [stock, isOpen, initialSide]);

  if (!isOpen || !stock) return null;

  const totalCost = quantity * stock.price;
  const holding = portfolio.holdings.find(h => h.symbol === stock.symbol);
  const ownedQuantity = holding ? holding.quantity : 0;

  const canBuy = portfolio.cashBalance >= totalCost;
  const canSell = ownedQuantity >= quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tradeType === 'BUY' && !canBuy) return;
    if (tradeType === 'SELL' && !canSell) return;
    onTrade(tradeType, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 shadow-sm">
               {stock.symbol[0]}
             </div>
             <div>
               <h3 className="font-bold text-slate-900">{stock.name}</h3>
               <p className="text-xs text-slate-500">{stock.symbol}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
           {/* Price Info */}
           <div className="flex justify-between items-end mb-6">
             <div>
                <p className="text-sm text-slate-500 mb-1">Current Price</p>
                <div className="text-3xl font-bold text-slate-900">${stock.price.toFixed(2)}</div>
             </div>
             <div className={`text-sm font-medium px-2 py-1 rounded-lg ${stock.change >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
               {stock.change >= 0 ? '+' : ''}{stock.changePercent}% Today
             </div>
           </div>

           {/* Trade Form */}
           <form onSubmit={handleSubmit}>
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tradeType === 'BUY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tradeType === 'SELL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Sell
                </button>
              </div>

              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-sm text-slate-500 px-1">
                    <span>Quantity</span>
                    <span>Available: {tradeType === 'SELL' ? ownedQuantity : `$${portfolio.cashBalance.toFixed(2)}`}</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <input 
                      type="number" 
                      min="1"
                      step="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="flex-1 text-2xl font-bold p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                   />
                   <div className="text-slate-400">
                     <ArrowRight size={20} />
                   </div>
                   <div className="flex-1 bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                      <div className="text-xs text-slate-400 uppercase font-semibold">Total Estimate</div>
                      <div className="text-xl font-bold text-slate-900">${totalCost.toFixed(2)}</div>
                   </div>
                 </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg rounded-xl shadow-xl shadow-blue-100"
                disabled={tradeType === 'BUY' ? !canBuy : !canSell}
              >
                {tradeType} {stock.symbol}
              </Button>
              
              {((tradeType === 'BUY' && !canBuy) || (tradeType === 'SELL' && !canSell)) && (
                <p className="text-center text-red-500 text-xs mt-3">
                  Insufficient {tradeType === 'BUY' ? 'funds' : 'holdings'} to complete this transaction.
                </p>
              )}
           </form>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
