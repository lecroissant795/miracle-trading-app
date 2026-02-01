
import React, { useState } from 'react';
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Wallet, Building2, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { Portfolio } from '../types';
import Button from './Button';
import Card from './Card';

interface WalletsViewProps {
  portfolio: Portfolio;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

const WalletsView: React.FC<WalletsViewProps> = ({ portfolio, onDeposit, onWithdraw }) => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
  const [amount, setAmount] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState<'CARDS' | 'BANKS'>('CARDS');


  // Calculate totals
  const investedAmount = portfolio.holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
  const totalValue = portfolio.cashBalance + investedAmount;



  const openTransactionModal = (type: 'DEPOSIT' | 'WITHDRAW') => {
      setTransactionType(type);
      setAmount(type === 'DEPOSIT' ? 1000 : 100);
      setIsTransactionModalOpen(true);
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (transactionType === 'WITHDRAW') {
          if (amount > portfolio.cashBalance) {
              alert(`Insufficient funds. You only have $${portfolio.cashBalance.toFixed(2)} available.`);
              return;
          }
          onWithdraw(amount);
      } else {
          onDeposit(amount);
      }
      setIsTransactionModalOpen(false);
  };

  return (
    <div className="p-8 h-full overflow-y-auto animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">My Wallets</h2>
           <p className="text-slate-500">Manage your funds and payment methods</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" onClick={() => openTransactionModal('WITHDRAW')}>
                <ArrowDownLeft size={18} className="mr-2" /> Withdraw
            </Button>
            <Button onClick={() => openTransactionModal('DEPOSIT')}>
                <Plus size={18} className="mr-2" /> Add Funds
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Virtual Card & Stats */}
          <div className="lg:col-span-7 space-y-8">
             
             {/* Virtual Card */}
             <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-300 group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl z-0"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl z-0"></div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">Total Balance</div>
                            <div className="text-3xl font-bold tracking-tight">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10">
                             <ShieldCheck size={16} className="text-emerald-400" />
                             <span className="text-xs font-medium">Miracle Protected</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="font-mono text-xl tracking-widest text-slate-200 drop-shadow-md">
                                ••••  ••••  ••••  0023
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Card Holder</div>
                                <div className="font-medium tracking-wide">Nguyen Dinh Bac</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Expires</div>
                                <div className="font-medium tracking-wide">12/28</div>
                            </div>
                            <div className="h-8">
                                {/* Simple Visa Logo Shape */}
                                <div className="text-2xl font-bold italic leading-none tracking-tighter">VISA</div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>


             
             {/* Recent Funding Activity */}
             <div>
                 <h3 className="font-bold text-slate-900 mb-4">Funding Activity</h3>
                 <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                     {[
                         { type: 'Deposit', method: 'Chase Bank (...8832)', date: 'Oct 24', amount: '+$5,000.00', status: 'Completed' },
                         { type: 'Withdrawal', method: 'Visa Debit (...0023)', date: 'Oct 12', amount: '-$250.00', status: 'Completed' },
                         { type: 'Deposit', method: 'Apple Pay', date: 'Sep 28', amount: '+$1,000.00', status: 'Completed' },
                     ].map((tx, i) => (
                         <div key={i} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                             <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                     {tx.type === 'Deposit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                 </div>
                                 <div>
                                     <div className="font-bold text-slate-900 text-sm">{tx.type}</div>
                                     <div className="text-xs text-slate-500">{tx.method} • {tx.date}</div>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className={`font-bold text-sm ${tx.type === 'Deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>{tx.amount}</div>
                                 <div className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full inline-block mt-1">{tx.status}</div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
          </div>

          {/* Right Column: Linked Methods */}
          <div className="lg:col-span-5 space-y-8">
              
              <Card>
                  <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-slate-900">Payment Methods</h3>
                      <button className="text-blue-600 text-sm font-medium hover:underline">Manage</button>
                  </div>

                  <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    <button 
                        onClick={() => setActiveTab('CARDS')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'CARDS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        Cards
                    </button>
                    <button 
                        onClick={() => setActiveTab('BANKS')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'BANKS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                    >
                        Bank Accounts
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                      {activeTab === 'CARDS' ? (
                          <>
                              {/* Mock Linked Item */}
                              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-tighter">VISA</div>
                                      <div>
                                          <div className="font-bold text-sm text-slate-900">Techcombank</div>
                                          <div className="text-xs text-slate-500">**** 4921 • Debit</div>
                                      </div>
                                  </div>
                                  <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-500" />
                              </div>

                              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-tighter relative overflow-hidden">
                                          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                                          MC
                                      </div>
                                      <div>
                                          <div className="font-bold text-sm text-slate-900">Mastercard</div>
                                          <div className="text-xs text-slate-500">**** 8832 • Credit</div>
                                      </div>
                                  </div>
                                  <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-500" />
                              </div>
                          </>
                      ) : (
                          <>
                              {/* Mock Bank Accounts */}
                              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-600">
                                          <Building2 size={20} />
                                      </div>
                                      <div>
                                          <div className="font-bold text-sm text-slate-900">Techcombank</div>
                                          <div className="text-xs text-slate-500">Savings • **** 8832</div>
                                      </div>
                                  </div>
                                  <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-500" />
                              </div>

                              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-600">
                                          <Building2 size={20} />
                                      </div>
                                      <div>
                                          <div className="font-bold text-sm text-slate-900">Vietcombank</div>
                                          <div className="text-xs text-slate-500">Checking • **** 1290</div>
                                      </div>
                                  </div>
                                  <MoreHorizontal size={18} className="text-slate-300 group-hover:text-slate-500" />
                              </div>
                          </>
                      )}

                      <button className="w-full py-3 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                          <Plus size={16} /> {activeTab === 'CARDS' ? 'Link New Card' : 'Link Bank Account'}
                      </button>
                  </div>
              </Card>

              {/* Security / Promo Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
                  <div className="relative z-10">
                      <ShieldCheck size={32} className="mb-4 text-blue-200" />
                      <h3 className="text-lg font-bold mb-2">Funds are SAFU</h3>
                      <p className="text-blue-100 text-sm leading-relaxed mb-6">
                          Your assets are protected by industry-leading security protocols and insured up to $500,000.
                      </p>
                      <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/20">
                          View Coverage
                      </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              </div>
          </div>
      </div>

      {/* Transaction Modal Overlay */}
      {isTransactionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold text-slate-900">
                         {transactionType === 'DEPOSIT' ? 'Add Funds' : 'Withdraw Funds'}
                     </h3>
                     <button onClick={() => setIsTransactionModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
                         <Plus size={24} className="rotate-45" />
                     </button>
                 </div>
                 
                 <form onSubmit={handleTransactionSubmit}>
                     <div className="mb-6">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount (USD)</label>
                         <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">$</span>
                             <input 
                                type="number" 
                                min="10" 
                                max={transactionType === 'DEPOSIT' ? 50000 : portfolio.cashBalance}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-10 pr-4 text-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                             />
                         </div>
                         {transactionType === 'WITHDRAW' && (
                             <p className="text-xs text-slate-400 mt-2 text-right">Available to withdraw: ${portfolio.cashBalance.toLocaleString()}</p>
                         )}
                     </div>

                     <div className="mb-8">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                             {transactionType === 'DEPOSIT' ? 'From' : 'To'}
                         </label>
                         <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-white">
                              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                              <div className="flex-1">
                                  <div className="text-sm font-bold text-slate-900">Techcombank</div>
                                  <div className="text-xs text-slate-500">**** 4921</div>
                              </div>
                              <div className="text-blue-600 text-xs font-bold cursor-pointer">Change</div>
                         </div>
                     </div>

                     <Button type="submit" className="w-full py-4 text-lg">
                         {transactionType === 'DEPOSIT' ? 'Confirm Deposit' : 'Confirm Withdrawal'}
                     </Button>
                 </form>
             </div>
        </div>
      )}
    </div>
  );
};

export default WalletsView;
