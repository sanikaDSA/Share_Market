import React from 'react';
import { useVirtualTrading } from '../contexts/VirtualTradingContext';
import { MOCK_STOCKS } from '../constants';
import { TrendingUp, TrendingDown, PieChart, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { portfolio, balance, getPortfolioValue } = useVirtualTrading();
  const portfolioValue = getPortfolioValue();
  const totalValue = balance + portfolioValue;
  const initialValue = 1000000;
  const totalProfit = totalValue - initialValue;
  const profitPercent = (totalProfit / initialValue) * 100;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} />
          </div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Total Net Worth</p>
          <p className="text-3xl font-bold tabular-nums mb-2">₹{totalValue.toLocaleString()}</p>
          <div className={`flex items-center gap-1 text-sm font-bold ${totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {totalProfit >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(profitPercent).toFixed(2)}% (₹{Math.abs(totalProfit).toLocaleString()})
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Invested Value</p>
          <p className="text-3xl font-bold tabular-nums mb-2">₹{portfolioValue.toLocaleString()}</p>
          <p className="text-xs text-zinc-500">Current market value of holdings</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Available Cash</p>
          <p className="text-3xl font-bold tabular-nums mb-2">₹{balance.toLocaleString()}</p>
          <p className="text-xs text-zinc-500">Ready to invest in new opportunities</p>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <PieChart size={20} className="text-emerald-500" />
          Your Holdings
        </h2>
        
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          {portfolio.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                <Briefcase size={32} />
              </div>
              <div>
                <p className="text-zinc-400 font-medium">Your portfolio is empty</p>
                <p className="text-xs text-zinc-600">Start trading to build your investment portfolio</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Avg Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Current</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {portfolio.map((item) => {
                    const stock = MOCK_STOCKS.find(s => s.symbol === item.symbol);
                    const currentPrice = stock?.price || item.currentPrice;
                    const pnl = (currentPrice - item.averagePrice) * item.quantity;
                    const pnlPercent = ((currentPrice - item.averagePrice) / item.averagePrice) * 100;

                    return (
                      <tr key={item.symbol} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold">{item.symbol}</p>
                            <p className="text-[10px] text-zinc-500 uppercase">{stock?.sector}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono">{item.quantity}</td>
                        <td className="px-6 py-4 font-mono text-zinc-400">₹{item.averagePrice.toLocaleString()}</td>
                        <td className="px-6 py-4 font-mono">₹{currentPrice.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className={`font-bold ${pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {pnl >= 0 ? '+' : ''}₹{Math.abs(pnl).toLocaleString()}
                            <span className="text-[10px] ml-1 opacity-70">({pnlPercent.toFixed(2)}%)</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { Briefcase } from 'lucide-react';
