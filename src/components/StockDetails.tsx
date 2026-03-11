import React, { useState } from 'react';
import { MOCK_STOCKS } from '../constants';
import { X, TrendingUp, TrendingDown, Info, ShoppingCart, History } from 'lucide-react';
import { StockChart } from './StockChart';
import { useVirtualTrading } from '../contexts/VirtualTradingContext';

interface StockDetailsProps {
  symbol: string;
  onClose: () => void;
}

const generateChartData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: Math.floor(Math.random() * 200) + 1500
  }));
};

export const StockDetails: React.FC<StockDetailsProps> = ({ symbol, onClose }) => {
  const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
  const { buyStock, sellStock, balance, portfolio } = useVirtualTrading();
  const [quantity, setQuantity] = useState(1);
  const [activeAction, setActiveAction] = useState<'BUY' | 'SELL'>('BUY');

  if (!stock) return null;

  const holding = portfolio.find(p => p.symbol === symbol);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-4xl rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-bold text-emerald-500">
              {stock.symbol[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold">{stock.name}</h2>
              <p className="text-zinc-500 text-sm font-mono">{stock.symbol} • {stock.sector}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-end gap-4">
              <p className="text-4xl font-bold tabular-nums">₹{stock.price.toLocaleString()}</p>
              <div className={`flex items-center gap-1 font-bold mb-1 ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stock.change >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                {stock.changePercent}%
              </div>
            </div>

            <StockChart data={generateChartData()} color={stock.change >= 0 ? "#10b981" : "#f43f5e"} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Market Cap</p>
                <p className="font-bold">{stock.marketCap}</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">P/E Ratio</p>
                <p className="font-bold">{stock.peRatio}</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Day High</p>
                <p className="font-bold">₹{stock.high}</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/30">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Day Low</p>
                <p className="font-bold">₹{stock.low}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Info size={16} className="text-emerald-500" />
                About {stock.name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {stock.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-800/50 p-6 rounded-3xl border border-zinc-700/30 space-y-6">
              <div className="flex p-1 bg-zinc-900 rounded-xl">
                <button 
                  onClick={() => setActiveAction('BUY')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeAction === 'BUY' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  BUY
                </button>
                <button 
                  onClick={() => setActiveAction('SELL')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeAction === 'SELL' ? 'bg-rose-500 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  SELL
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">Quantity</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Price per share</span>
                    <span className="font-mono">₹{stock.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total Amount</span>
                    <span className="text-emerald-500">₹{(quantity * stock.price).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => activeAction === 'BUY' ? buyStock(symbol, quantity, stock.price) : sellStock(symbol, quantity, stock.price)}
                  className={`w-full py-4 rounded-2xl font-bold text-zinc-950 transition-all shadow-lg ${
                    activeAction === 'BUY' 
                      ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' 
                      : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20'
                  }`}
                >
                  Confirm {activeAction}
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-700/50 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <span>Available Balance</span>
                  <span className="text-zinc-300">₹{balance.toLocaleString()}</span>
                </div>
                {holding && (
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    <span>Current Holding</span>
                    <span className="text-zinc-300">{holding.quantity} Shares</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-700/20">
              <h4 className="text-xs font-bold mb-3 flex items-center gap-2">
                <History size={14} className="text-zinc-500" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                <p className="text-[10px] text-zinc-500 text-center py-4 italic">No recent trades for this stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
