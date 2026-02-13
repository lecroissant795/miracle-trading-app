import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Download, Printer, ArrowUpRight } from 'lucide-react';
import { Stock } from '../types';
import { useTranslation } from '../services/LanguageContext';

interface FinancialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
}

type StatementType = 'INCOME' | 'BALANCE' | 'CASH';

const FinancialsModal: React.FC<FinancialsModalProps> = ({ isOpen, onClose, stock }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<StatementType>('INCOME');

  if (!isOpen) return null;

  // Mock data generation based on stock price to create semi-realistic large numbers
  const baseM = stock.price * 100; // Multiplier for mock values in Millions
  
  const years = ['2023', '2022', '2021', '2020'];

  const incomeData = [
    { label: t.stockDetail.totalRevenue, values: [baseM * 1.15, baseM, baseM * 0.9, baseM * 0.8] },
    { label: t.stockDetail.cost, values: [baseM * 0.6, baseM * 0.55, baseM * 0.5, baseM * 0.45] },
    { label: t.stockDetail.grossProfit, values: [baseM * 0.55, baseM * 0.45, baseM * 0.4, baseM * 0.35], bold: true },
    { label: t.stockDetail.operatingExpenses, values: [baseM * 0.2, baseM * 0.18, baseM * 0.15, baseM * 0.12] },
    { label: t.stockDetail.operatingIncome, values: [baseM * 0.35, baseM * 0.27, baseM * 0.25, baseM * 0.23] },
    { label: t.stockDetail.netIncome, values: [baseM * 0.28, baseM * 0.22, baseM * 0.20, baseM * 0.18], bold: true, color: 'text-emerald-600' },
    { label: t.stockDetail.ebitda, values: [baseM * 0.4, baseM * 0.32, baseM * 0.3, baseM * 0.28] },
  ];

  const balanceData = [
    { label: t.stockDetail.totalAssets, values: [baseM * 5, baseM * 4.5, baseM * 4.2, baseM * 4.0], bold: true },
    { label: '  ' + t.stockDetail.currentAssets, values: [baseM * 1.5, baseM * 1.2, baseM * 1.1, baseM * 1.0] },
    { label: '  ' + t.stockDetail.nonCurrentAssets, values: [baseM * 3.5, baseM * 3.3, baseM * 3.1, baseM * 3.0] },
    { label: t.stockDetail.totalLiabilities, values: [baseM * 2.5, baseM * 2.2, baseM * 2.1, baseM * 2.0], bold: true },
    { label: '  ' + t.stockDetail.currentLiabilities, values: [baseM * 1.0, baseM * 0.9, baseM * 0.8, baseM * 0.7] },
    { label: '  ' + t.stockDetail.longTermDebt, values: [baseM * 1.5, baseM * 1.3, baseM * 1.3, baseM * 1.3] },
    { label: t.stockDetail.totalEquity, values: [baseM * 2.5, baseM * 2.3, baseM * 2.1, baseM * 2.0], bold: true, color: 'text-blue-600' },
  ];

  const cashData = [
    { label: t.stockDetail.cashFromOperating, values: [baseM * 0.35, baseM * 0.3, baseM * 0.25, baseM * 0.22], bold: true },
    { label: t.stockDetail.cashFromInvesting, values: [-baseM * 0.1, -baseM * 0.12, -baseM * 0.08, -baseM * 0.05] },
    { label: t.stockDetail.cashFromFinancing, values: [-baseM * 0.05, -baseM * 0.02, -baseM * 0.05, baseM * 0.01] },
    { label: t.stockDetail.netChangeCash, values: [baseM * 0.2, baseM * 0.16, baseM * 0.12, baseM * 0.18], bold: true, color: 'text-emerald-600' },
    { label: t.stockDetail.freeCashFlow, values: [baseM * 0.25, baseM * 0.18, baseM * 0.17, baseM * 0.17] },
  ];

  const getData = () => {
    switch(activeTab) {
      case 'BALANCE': return balanceData;
      case 'CASH': return cashData;
      default: return incomeData;
    }
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(2)}B`;
    return `$${val.toFixed(0)}M`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
           <div>
             <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
               {stock.name}
               <span className="text-slate-400 font-normal">{t.stockDetail.financials}</span>
             </h2>
             <p className="text-xs text-slate-500 mt-1">{t.stockDetail.fiscalYearEnd}</p>
           </div>
           <div className="flex items-center gap-2">
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
                <Printer size={20} />
             </button>
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
                <Download size={20} />
             </button>
             <button 
               onClick={onClose} 
               className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors ml-2"
             >
               <X size={22} />
             </button>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 sm:items-center justify-between flex-shrink-0">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            {(['INCOME', 'BALANCE', 'CASH'] as const).map((tabType) => (
              <button
                key={tabType}
                onClick={() => setActiveTab(tabType)}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tabType 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tabType === 'INCOME' ? t.stockDetail.incomeStatement : tabType === 'BALANCE' ? t.stockDetail.balanceSheet : t.stockDetail.cashFlowStatement}
              </button>
            ))}
          </div>
          <div className="py-3 flex items-center gap-3">
              <span className="hidden md:inline-block text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                  {t.stockDetail.annualReport}
              </span>
              <button 
                  onClick={() => window.open(`https://finance.yahoo.com/quote/${stock.symbol}/financials`, '_blank')}
                  className="text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                  {t.stockDetail.compFinancials} <ArrowUpRight size={14} />
              </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/80 backdrop-blur-sm w-1/3">{t.stockDetail.breakdown}</th>
                {years.map(year => (
                  <th key={year} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right bg-slate-50/80 backdrop-blur-sm">
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {getData().map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                  <td className={`px-6 py-4 text-sm ${row.bold ? 'font-bold' : 'font-medium'} ${row.color || 'text-slate-700'} ${row.label.startsWith('  ') ? 'pl-10 text-slate-500 font-normal' : ''}`}>
                    {row.label}
                  </td>
                  {row.values.map((val, i) => (
                    <td key={i} className={`px-6 py-4 text-sm text-right font-mono ${row.bold ? 'font-bold' : ''} ${row.color || 'text-slate-600'}`}>
                      {formatCurrency(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
          {t.stockDetail.simulationPurpose}
        </div>
      </div>
    </div>
  );
};

export default FinancialsModal;