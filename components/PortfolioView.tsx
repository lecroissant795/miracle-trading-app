
import React, { useState, useMemo } from 'react';
import { MoreHorizontal, PieChart as PieChartIcon } from 'lucide-react';
import { Stock, Portfolio, Transaction, Pie as PieType } from '../types';
import Button from './Button';
import StockChart from './StockChart';
import PortfolioPieChart from './PortfolioPieChart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../services/LanguageContext';

interface PortfolioViewProps {
  portfolio: Portfolio;
  stocks: Stock[];
  transactions: Transaction[];
  pies: PieType[];
  selectedStock: Stock;
  aiTip: string;
  onViewHoldings: () => void;
  onSelectStock: (stock: Stock) => void;
  onSelectPie: (pie: PieType) => void;
  onCreatePie: () => void;
  onTradeStock: () => void;
  netWorth: number;
  investedValue: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

const SECTOR_MAP: Record<string, string> = {
  AAPL: 'Technology',
  MSFT: 'Technology',
  NVDA: 'Technology',
  GOOGL: 'Technology',
  TSLA: 'Technology',
  QQQ: 'Technology',
  SPX: 'Index',
  NDX: 'Index',
  DJI: 'Index',
  VTSAX: 'Finance',
  FXAIX: 'Finance',
  SWPPX: 'Finance',
  BTC: 'Crypto',
  ETH: 'Crypto',
};

const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolio,
  stocks,
  transactions,
  pies,
  selectedStock,
  aiTip,
  onViewHoldings,
  onSelectStock,
  onSelectPie,
  onCreatePie,
  onTradeStock,
  netWorth,
  investedValue,
}) => {
  const { t } = useTranslation();
  const getStockData = (symbol: string) => stocks.find((s) => s.symbol === symbol) || stocks[0];

  const equityValue = investedValue;
  const totalCost = portfolio.holdings.reduce((acc, h) => acc + h.quantity * h.avgPrice, 0);
  const totalReturnValue = equityValue - totalCost;
  const totalReturnPercent = totalCost > 0 ? (totalReturnValue / totalCost) * 100 : 0;

  const sectorTotals: Record<string, number> = {};
  portfolio.holdings.forEach((h) => {
    const stock = getStockData(h.symbol);
    const sector = SECTOR_MAP[stock.symbol] || 'Other';
    const value = h.quantity * stock.price;
    sectorTotals[sector] = (sectorTotals[sector] || 0) + value;
  });

  const sortedSectors = Object.entries(sectorTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const sectorTotalValue = Object.values(sectorTotals).reduce((a, b) => a + b, 0) || 1;

  const fakeSharpe = 1.84;
  const fakeBeta = 1.12;

  const [compareWithSP500, setCompareWithSP500] = useState(false);
  const spxStock = stocks.find((s) => s.symbol === 'SPX');
  const sp500Raw = spxStock?.chartData || [];

  // Portfolio performance: daily portfolio value from holdings' chart data, then index to 100 at start
  const portfolioPerformanceData = useMemo(() => {
    const len = 30;
    const values: number[] = [];
    for (let i = 0; i < len; i++) {
      let total = portfolio.cashBalance;
      portfolio.holdings.forEach((h) => {
        const stock = getStockData(h.symbol);
        const series = stock?.chartData ?? [];
        const point = series[i] ?? series[series.length - 1];
        const price = point?.value ?? stock?.price ?? 0;
        total += h.quantity * price;
      });
      values.push(total);
    }
    const base = values[0] || 1;
    return values.map((v, i) => ({ name: `Day ${i + 1}`, value: (100 * v) / base }));
  }, [portfolio.holdings, portfolio.cashBalance, stocks]);

  // S&P 500 benchmark: same 30-day index (100 at start) so both lines are comparable
  const sp500ChartData = useMemo(() => {
    if (!sp500Raw.length) return [];
    const base = sp500Raw[0]?.value ?? 1;
    return sp500Raw.map((d, i) => ({ name: d.name, value: (100 * (d.value ?? 0)) / base }));
  }, [sp500Raw]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{t.portfolio.investmentPortfolio}</h1>
            <p className="text-sm text-slate-500 mt-1">{t.portfolio.detailedView}</p>
          </div>
        </header>

        {/* Top row: allocation + pies */}
        {/* Top row: allocation + pies */}
        {/* Top row: allocation + pies */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Investment portfolio card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-6">
              <PieChartIcon size={18} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.portfolio.investmentPortfolio}</span>
            </div>

            <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-10 h-full">
              {/* Chart Side: room for donut + legend, left-aligned */}
              <div className="w-full min-w-[200px] max-w-[240px] h-48 shrink-0 flex items-center justify-center xl:justify-start">
                 <PortfolioPieChart portfolio={portfolio} stocks={stocks} />
              </div>

              {/* Stats Side */}
              <div className="flex-1 w-full max-w-xl">
                  <div className="mb-6">
                       <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t.portfolio.totalNetWorth}</div>
                       <div className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                          ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                       </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                       <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100/50">
                            <div className="text-[10px] font-bold text-blue-600 uppercase mb-1">{t.portfolio.invested}</div>
                            <div className="text-xl font-bold text-slate-900">${investedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                       </div>
                       <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100/50">
                            <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{t.portfolio.cash}</div>
                            <div className="text-xl font-bold text-slate-900">${portfolio.cashBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                       </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <span>Updated a few seconds ago</span>
                      <span>{portfolio.holdings.length} holdings</span>
                  </div>
              </div>
            </div>
          </div>

          {/* My pies card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                 <h2 className="text-base font-bold text-slate-900">{t.portfolio.myPies}</h2>
                 {pies.length > 0 && (
                     <button className="text-slate-400 hover:text-slate-600">
                         <MoreHorizontal size={20} />
                     </button>
                 )}
            </div>

            {pies.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-5 text-slate-300">
                  <PieChartIcon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Create your first Pie</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-[200px] leading-relaxed mx-auto">
                  Group stocks & ETFs into a custom portfolio pie and invest automatically.
                </p>
                <Button className="w-full py-3 shadow-none bg-blue-600 hover:bg-blue-700 font-semibold" onClick={onCreatePie}>
                  Create Pie
                </Button>
              </div>
            ) : (
              <div className="space-y-3 mt-2">
                {pies.slice(0, 3).map((pie) => (
                  <button
                    key={pie.id}
                    onClick={() => onSelectPie(pie)}
                    className="w-full text-left p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={pie.holdings.map((h) => ({ name: h.symbol, value: h.weight }))}
                            dataKey="value"
                            innerRadius={12}
                            outerRadius={20}
                            strokeWidth={0}
                          >
                            {pie.holdings.map((_, i) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{pie.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">${pie.value.toLocaleString()}</div>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      +12.5%
                    </div>
                  </button>
                ))}

                <button 
                    onClick={onCreatePie}
                    className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 mt-2 text-sm"
                >
                    <PieChartIcon size={16} /> {t.portfolio.createPie}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Analytics row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Total return</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                ${Math.max(0, totalReturnValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-semibold text-emerald-500">
                {totalReturnPercent >= 0 ? '+' : ''}
                {totalReturnPercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Since inception · includes unrealized gains</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Sharpe ratio</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{fakeSharpe.toFixed(2)}</div>
            <p className="text-[11px] text-slate-400">Top 15% of similar risk profiles</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Beta (risk)</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{fakeBeta.toFixed(2)}</div>
            <p className="text-[11px] text-amber-500">Higher volatility vs S&P 500</p>
          </div>
        </section>

        {/* Performance + risk row */}
        <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)] gap-6">
          {/* Portfolio performance chart */}
          <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{t.portfolio.performance}</h2>
                <p className="text-xs text-slate-400">{t.portfolio.last30Sessions}</p>
              </div>
              <div className="flex gap-2 text-xs bg-slate-50 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setCompareWithSP500(false)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${!compareWithSP500 ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  You
                </button>
                <button
                  type="button"
                  onClick={() => setCompareWithSP500(true)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${compareWithSP500 ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  S&P 500
                </button>
              </div>
            </div>

            <div className="h-72">
              <StockChart
                data={portfolioPerformanceData}
                color="#3b82f6"
                height={260}
                benchmarkData={compareWithSP500 ? sp500ChartData : undefined}
                benchmarkColor="#f59e0b"
              />
            </div>
          </div>

          {/* Right column: sectors + risk analysis */}
          <div className="space-y-6">
            {/* Top sectors */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Top sectors</h3>
                <span className="text-[11px] text-slate-400">By market value</span>
              </div>

              <div className="space-y-3">
                {sortedSectors.map(([sector, value]) => {
                  const pct = (value / sectorTotalValue) * 100;
                  return (
                    <div key={sector} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{sector}</span>
                        <span>{pct.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk analysis card */}
            <div className="rounded-3xl p-6 text-slate-50 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Risk analysis</div>
                  <div className="text-base font-semibold">Concentration & volatility</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 mb-1">Risk score</div>
                  <div className="text-2xl font-bold">7.4</div>
                </div>
              </div>

              <div className="h-1 rounded-full bg-slate-700 mb-4 overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400" />
              </div>

              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>45% allocation to Technology — concentration risk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  <span>15% in Crypto — elevated volatility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                  <span>Single-stock exposure above 8% of portfolio.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* All holdings table */}
        <section className="bg-white rounded-3xl p-6 md:p-7 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-slate-900">All holdings</h2>
              <p className="text-xs text-slate-400">Detailed view of every position in your portfolio.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <div className="text-[11px] uppercase text-slate-400 font-semibold">{t.portfolio.totalEquity}</div>
                <div className="font-semibold text-slate-900">
                  ${equityValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase text-slate-400 font-semibold">{t.portfolio.return}</div>
                <div className="font-semibold text-emerald-500">
                  {totalReturnPercent >= 0 ? '+' : ''}
                  {totalReturnPercent.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase text-slate-400 font-semibold">{t.portfolio.freeFunds}</div>
                <div className="font-semibold text-slate-900">
                  ${portfolio.cashBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 border-b border-slate-100">
                  <th className="py-2 pl-4 pr-2 text-left font-medium">{t.portfolio.asset}</th>
                  <th className="py-2 px-2 text-right font-medium">{t.portfolio.quantity}</th>
                  <th className="py-2 px-2 text-right font-medium">{t.portfolio.avgPrice}</th>
                  <th className="py-2 px-2 text-right font-medium">{t.portfolio.currentPrice}</th>
                  <th className="py-2 px-2 text-right font-medium">{t.portfolio.totalValue}</th>
                  <th className="py-2 pl-2 pr-4 text-right font-medium">{t.portfolio.return}</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => {
                  const stock = getStockData(holding.symbol);
                  const currentValue = holding.quantity * stock.price;
                  const cost = holding.quantity * holding.avgPrice;
                  const ret = currentValue - cost;
                  const retPct = cost > 0 ? (ret / cost) * 100 : 0;

                  return (
                    <tr key={holding.symbol} className="border-b border-slate-50 hover:bg-slate-50/60 cursor-pointer" onClick={() => onSelectStock(stock)}>
                      <td className="py-3 pl-4 pr-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                            {stock.symbol[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{stock.name}</div>
                            <div className="text-[11px] text-slate-400">{stock.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right tabular-nums text-slate-600">{holding.quantity}</td>
                      <td className="py-3 px-2 text-right tabular-nums text-slate-600">${holding.avgPrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right tabular-nums text-slate-600">${stock.price.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right tabular-nums text-slate-900 font-medium">
                        ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 pl-2 pr-4 text-right tabular-nums font-semibold">
                        <span className={ret >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                          {ret >= 0 ? '+' : ''}
                          {ret.toFixed(2)} ({retPct.toFixed(2)}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioView;
