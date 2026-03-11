import React from 'react';
import { MOCK_STOCKS, MOCK_INDICES, MOCK_NEWS } from '../constants';
import { TrendingUp, TrendingDown, ArrowRight, ExternalLink } from 'lucide-react';
import { StockChart } from './StockChart';

const generateChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    price: Math.floor(Math.random() * 100) + 1000
  }));
};

export const MarketDashboard: React.FC<{ onStockSelect: (symbol: string) => void }> = ({ onStockSelect }) => {
  return (
    <div className="space-y-8">
      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_INDICES.map((index) => (
          <div key={index.name} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-default group">
            <div className="flex justify-between items-start mb-2">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{index.name}</p>
              <div className={`flex items-center gap-1 text-xs font-bold ${index.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {index.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {index.changePercent}%
              </div>
            </div>
            <p className="text-2xl font-bold tabular-nums">₹{index.value.toLocaleString()}</p>
            <p className={`text-xs mt-1 ${index.change >= 0 ? 'text-emerald-500/70' : 'text-rose-500/70'}`}>
              {index.change >= 0 ? '+' : ''}{index.change.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Stocks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Trending Stocks</h2>
            <button className="text-emerald-500 text-sm font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Change</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Market Cap</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {MOCK_STOCKS.map((stock) => (
                    <tr 
                      key={stock.symbol} 
                      className="hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                      onClick={() => onStockSelect(stock.symbol)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-zinc-100">{stock.symbol}</p>
                          <p className="text-xs text-zinc-500">{stock.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">₹{stock.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-medium ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{stock.marketCap}</td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-1.5 bg-zinc-800 text-zinc-100 text-xs font-bold rounded-lg group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all">
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market News */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Market News</h2>
          <div className="space-y-4">
            {MOCK_NEWS.map((news) => (
              <div key={news.id} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${
                    news.sentiment === 'positive' ? 'bg-emerald-500' : 
                    news.sentiment === 'negative' ? 'bg-rose-500' : 'bg-zinc-500'
                  }`}></span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{news.source}</span>
                </div>
                <h3 className="font-bold text-zinc-200 leading-snug mb-2 group-hover:text-emerald-500 transition-colors">
                  {news.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600">{new Date(news.timestamp).toLocaleTimeString()}</span>
                  <a href={news.url} className="text-zinc-400 hover:text-zinc-100">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
