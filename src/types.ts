export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  peRatio: number;
  high: number;
  low: number;
  open: number;
  close: number;
  description: string;
  sector: string;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: number;
}

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: number;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}
