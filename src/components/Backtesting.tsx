import React, { useState } from 'react';
import { MOCK_STOCKS } from '../constants';
import { Play, RotateCcw, TrendingUp, TrendingDown, History, Info } from 'lucide-react';

interface BacktestResult {
  initialBalance: number;
  finalBalance: number;
  totalTrades: number;
  winRate: number;
  maxDrawdown: number;
  returns: number;
}

export const Backtesting: React.FC = () => {
  const [symbol, setSymbol] = useState(MOCK_STOCKS[0].symbol);
  const [strategy, setStrategy] = useState('dip');
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runBacktest = () => {
    setLoading(true);
    // Simulate backtest logic
    setTimeout(() => {
      const initialBalance = 100000;
      const returns = Math.random() * 40 - 10; // -10% to +30%
      const finalBalance = initialBalance * (1 + returns / 100);
      
      setResult({
        initialBalance,
        finalBalance,
        totalTrades: Math.floor(Math.random() * 50) + 10,
        winRate: Math.floor(Math.random() * 40) + 40,
        maxDrawdown: Math.floor(Math.random() * 15) + 5,
        returns
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <History className="text-zinc-950" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Strategy Backtesting</h2>
            <p className="text-xs text-zinc-500">Test your trading rules against historical market data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Select Asset</label>
            <select 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            >
              {MOCK_STOCKS.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Strategy Rule</label>
            <select 
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="dip">Buy the Dip (5% drop)</option>
              <option value="momentum">Momentum (3 days green)</option>
              <option value="rsi">RSI Oversold (RSI &lt; 30)</option>
              <option value="ma">Moving Average Crossover</option>
            </select>
          </div>

          <div className="flex items-end">
            <button 
              onClick={runBacktest}
              disabled={loading}
              className="w-full bg-blue-500 text-zinc-950 font-bold py-3 rounded-xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RotateCcw className="animate-spin" size={20} /> : <Play size={20} />}
              Run Backtest
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Performance Summary</h3>
              <div className={`px-4 py-1 rounded-full text-xs font-bold ${result.returns >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {result.returns >= 0 ? 'PROFITABLE' : 'UNPROFITABLE'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Total Return</p>
                <p className={`text-2xl font-bold ${result.returns >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {result.returns >= 0 ? '+' : ''}{result.returns.toFixed(2)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Win Rate</p>
                <p className="text-2xl font-bold text-zinc-100">{result.winRate}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Total Trades</p>
                <p className="text-2xl font-bold text-zinc-100">{result.totalTrades}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Max Drawdown</p>
                <p className="text-2xl font-bold text-rose-500">-{result.maxDrawdown}%</p>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-4 text-zinc-400">
                <Info size={16} />
                <span className="text-xs font-medium">Strategy Insights</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Based on the historical data for {symbol}, this strategy performed {result.returns >= 0 ? 'well' : 'poorly'}. 
                The win rate of {result.winRate}% suggests that the entry signals are {result.winRate > 50 ? 'reliable' : 'somewhat inconsistent'}. 
                Consider adjusting the stop-loss parameters to reduce the maximum drawdown of {result.maxDrawdown}%.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h3 className="font-bold">Equity Curve</h3>
            <div className="h-48 flex items-end gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-500/40 transition-all cursor-pointer"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase">
              <span>Start</span>
              <span>End</span>
            </div>
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Initial Capital</span>
                <span className="font-mono">₹{result.initialBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-zinc-100">Final Capital</span>
                <span className="text-emerald-500 font-mono">₹{result.finalBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
