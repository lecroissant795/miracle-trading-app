import React, { useState } from 'react';
import { X, Search, Check, Plus, PieChart as PieIcon, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Stock, Pie as PieType, PieHolding } from '../types';
import Button from './Button';

interface CreatePieModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableStocks: Stock[];
  onCreatePie: (pie: PieType, initialDeposit: number) => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6'];

const CreatePieModal: React.FC<CreatePieModalProps> = ({ isOpen, onClose, availableStocks, onCreatePie }) => {
  const [step, setStep] = useState<'START' | 'SELECT' | 'WEIGHTS' | 'DEPOSIT'>('START');
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [deposit, setDeposit] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 'START') setStep('SELECT');
    else if (step === 'SELECT') {
      // Initialize equal weights
      const count = selectedSymbols.length;
      if (count === 0) return;
      const evenWeight = Math.floor(100 / count);
      const remainder = 100 - (evenWeight * count);
      
      const newWeights: Record<string, number> = {};
      selectedSymbols.forEach((sym, idx) => {
        newWeights[sym] = idx === 0 ? evenWeight + remainder : evenWeight;
      });
      setWeights(newWeights);
      setStep('WEIGHTS');
    }
    else if (step === 'WEIGHTS') {
        const total = (Object.values(weights) as number[]).reduce((a, b) => a + b, 0);
        if (Math.abs(total - 100) > 0.1) {
            alert(`Total weight must be 100%. Current: ${total}%`);
            return;
        }
        setStep('DEPOSIT');
    }
  };

  const handleBack = () => {
    if (step === 'SELECT') setStep('START');
    if (step === 'WEIGHTS') setStep('SELECT');
    if (step === 'DEPOSIT') setStep('WEIGHTS');
  };

  const handleCreate = () => {
    const holdings: PieHolding[] = selectedSymbols.map(sym => ({
      symbol: sym,
      weight: weights[sym]
    }));

    const newPie: PieType = {
      id: Math.random().toString(36).substr(2, 9),
      name: `My Custom Pie ${Math.floor(Math.random() * 100)}`,
      holdings,
      value: deposit,
      performance: 0
    };

    onCreatePie(newPie, deposit);
    // Reset state
    setStep('START');
    setSelectedSymbols([]);
    setWeights({});
    setDeposit(100);
    onClose();
  };

  const toggleStock = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(prev => prev.filter(s => s !== symbol));
    } else {
      if (selectedSymbols.length >= 8) {
          alert("Max 8 assets allowed in a pie.");
          return;
      }
      setSelectedSymbols(prev => [...prev, symbol]);
    }
  };

  const updateWeight = (symbol: string, val: number) => {
    setWeights(prev => ({ ...prev, [symbol]: val }));
  };

  // --- RENDER STEPS ---

  const renderStart = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto flex items-center justify-center mb-6 relative">
          {/* Donut graphic representation */}
          <div className="w-16 h-16 rounded-full border-8 border-slate-300 border-t-blue-500 border-r-emerald-400"></div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Build your pie</h2>
      <p className="text-slate-500 mb-8 max-w-xs mx-auto">Choose your favorite stocks and ETFs - they will show up as slices in the pie.</p>
      
      <div className="flex gap-4 justify-center">
         <Button onClick={handleNext} className="w-full max-w-xs py-3">
             <Plus size={18} className="mr-2" />
             Create Custom Pie
         </Button>
      </div>
    </div>
  );

  const renderSelect = () => {
      const filtered = availableStocks.filter(s => 
          s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div className="h-[500px] flex flex-col">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search stocks (e.g. Apple)" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['Most Traded', 'Most Owned', 'Tech', 'Green'].map(tag => (
                    <button key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm whitespace-nowrap hover:bg-slate-200">
                        {tag}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {filtered.map(stock => {
                    const isSelected = selectedSymbols.includes(stock.symbol);
                    return (
                        <div 
                            key={stock.symbol} 
                            onClick={() => toggleStock(stock.symbol)}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-100 font-bold text-xs text-slate-700">
                                    {stock.symbol[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{stock.symbol}</div>
                                    <div className="text-xs text-slate-500">{stock.name}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">${stock.price}</div>
                                <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stock.changePercent}%
                                </div>
                            </div>
                            {isSelected && <div className="absolute right-4 top-4 text-blue-500"><Check size={16} /></div>}
                        </div>
                    );
                })}
            </div>
            
            <div className="pt-4 border-t border-slate-100 mt-2 flex justify-between items-center">
                <span className="text-sm text-slate-500">{selectedSymbols.length} selected</span>
                <Button onClick={handleNext} disabled={selectedSymbols.length === 0}>
                    Next <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>
        </div>
      );
  };

  const renderWeights = () => {
      const data = selectedSymbols.map(sym => ({ name: sym, value: weights[sym] || 0 }));
      const total = data.reduce((a: number, b) => a + b.value, 0);

      return (
          <div className="h-[550px] flex flex-col">
              <div className="flex items-center justify-center h-48 mb-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                          >
                              {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                      <span className="text-2xl font-bold text-slate-900">{total}%</span>
                      <span className="text-xs text-slate-500">Allocation</span>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {selectedSymbols.map((sym, idx) => (
                      <div key={sym} className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                  <span>{sym}</span>
                              </div>
                              <span>{weights[sym]}%</span>
                          </div>
                          <input 
                              type="range" 
                              min="1" 
                              max="100" 
                              value={weights[sym]} 
                              onChange={(e) => updateWeight(sym, Number(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                      </div>
                  ))}
              </div>

              <div className="pt-4 mt-2 flex justify-end">
                  <Button onClick={handleNext}>Next <ArrowRight size={16} className="ml-2" /></Button>
              </div>
          </div>
      );
  };

  const renderDeposit = () => (
      <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Initial Deposit</h2>
          <p className="text-slate-500 mb-8">How much would you like to invest in this pie initially?</p>

          <div className="text-5xl font-bold text-slate-900 mb-8">
              ${deposit.toLocaleString()}
          </div>

          <div className="px-8 mb-8">
              <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10"
                  value={deposit} 
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>Min: $10</span>
                  <span>Max: $5,000</span>
              </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl text-left text-sm text-blue-800 flex gap-3 items-start mb-8">
              <Info size={18} className="flex-shrink-0 mt-0.5" />
              <p>Your cash balance ($15,000+) is sufficient for this transaction. Funds will be distributed according to your target weights immediately.</p>
          </div>

          <Button onClick={handleCreate} className="w-full py-3 text-lg">
              Confirm & Invest
          </Button>
      </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
                {step !== 'START' && (
                    <button onClick={handleBack} className="p-1 hover:bg-slate-100 rounded-full text-slate-500 mr-2">
                        <ArrowLeft size={20} />
                    </button>
                )}
                <span className="font-bold text-slate-800">
                    {step === 'START' && 'Create Pie'}
                    {step === 'SELECT' && 'Select Assets'}
                    {step === 'WEIGHTS' && 'Configure Weights'}
                    {step === 'DEPOSIT' && 'Fund Pie'}
                </span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
            {step === 'START' && renderStart()}
            {step === 'SELECT' && renderSelect()}
            {step === 'WEIGHTS' && renderWeights()}
            {step === 'DEPOSIT' && renderDeposit()}
        </div>
      </div>
    </div>
  );
};

export default CreatePieModal;