
export interface StockDetails {
  previousClose: number;
  dayRangeLow: number;
  dayRangeHigh: number;
  yearRangeLow: number;
  yearRangeHigh: number;
  marketCap: number; // in billions
  volume: number;
  dividendYield: number;
  peRatio: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'Stock' | 'Fund' | 'Crypto' | 'Index' | 'Currency';
  description?: string;
  details?: StockDetails; // Optional for mock data compatibility
  chartData?: { name: string; value: number }[]; // Mock chart data
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export interface Portfolio {
  cashBalance: number;
  holdings: Holding[];
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  date: Date;
}

export interface PieHolding {
  symbol: string;
  weight: number; // 0-100
}

export interface Pie {
  id: string;
  name: string;
  holdings: PieHolding[];
  value: number;
  performance: number; // percentage
}

export type ViewState = 'LANDING' | 'DASHBOARD' | 'PORTFOLIO' | 'STOCK_DETAILS' | 'EXCHANGE' | 'MARKET_EXPLORER' | 'WALLETS' | 'HOLDINGS' | 'ACADEMY' | 'SUPPORT' | 'SETTINGS' | 'PIE_DETAILS' | 'ANALYTICS' | 'COMMUNITY' | 'LISTING' | 'AUTH' | 'STOCK_DETAILS_PUBLIC' | 'SUPPORT_PUBLIC';
