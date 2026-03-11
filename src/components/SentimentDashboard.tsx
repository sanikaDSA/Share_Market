import React, { useState } from 'react';
import { MOCK_STOCKS, MOCK_NEWS } from '../constants';
import { getStockSentiment } from '../services/geminiService';
import { BarChart3, Loader2, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SentimentDashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(MOCK_STOCKS[0].symbol);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getStockSentiment(selectedSymbol, MOCK_NEWS);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="text-emerald-500" size={24} />
          Sentiment Analysis
        </h2>
        <div className="flex gap-2">
          <select 
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50"
          >
            {MOCK_STOCKS.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol}</option>)}
          </select>
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-emerald-500 text-zinc-950 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Analyze"}
          </button>
        </div>
      </div>

      {analysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-zinc-400 uppercase text-xs tracking-widest">Sentiment Score</h3>
              <span className={`text-2xl font-bold ${analysis.score > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {(analysis.score * 100).toFixed(0)}%
              </span>
            </div>
            
            <div className="relative h-4 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-1/2 transition-all duration-1000 ${analysis.score > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ 
                  width: `${Math.abs(analysis.score) * 50}%`,
                  left: analysis.score > 0 ? '50%' : `${50 - Math.abs(analysis.score) * 50}%`
                }}
              ></div>
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-zinc-600"></div>
            </div>
            
            <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Info size={14} className="text-emerald-500" />
                Summary
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {analysis.summary}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
              <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-emerald-500">
                <CheckCircle2 size={16} />
                Opportunities
              </h4>
              <ul className="space-y-2">
                {analysis.opportunities.map((item: string, i: number) => (
                  <li key={i} className="text-xs text-zinc-400 flex gap-2">
                    <span className="text-emerald-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
              <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-rose-500">
                <AlertCircle size={16} />
                Risks
              </h4>
              <ul className="space-y-2">
                {analysis.risks.map((item: string, i: number) => (
                  <li key={i} className="text-xs text-zinc-400 flex gap-2">
                    <span className="text-rose-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center">
          <p className="text-zinc-500">Select a stock and click analyze to see market sentiment</p>
        </div>
      )}
    </div>
  );
};
