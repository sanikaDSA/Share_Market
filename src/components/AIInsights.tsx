import React, { useState } from 'react';
import { useVirtualTrading } from '../contexts/VirtualTradingContext';
import { MOCK_STOCKS } from '../constants';
import { analyzePortfolio } from '../services/geminiService';
import { Sparkles, Brain, Shield, Zap, Loader2, MessageSquare, BarChart3 } from 'lucide-react';
import Markdown from 'react-markdown';
import { SentimentDashboard } from './SentimentDashboard';

export const AIInsights: React.FC = () => {
  const { portfolio } = useVirtualTrading();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'analysis' | 'sentiment'>('analysis');

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzePortfolio(portfolio, MOCK_STOCKS);
    setAnalysis(result || "Analysis failed.");
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 p-1 bg-zinc-900 w-fit rounded-xl border border-zinc-800">
        <button 
          onClick={() => setActiveSubTab('analysis')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeSubTab === 'analysis' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Brain size={14} />
          Portfolio Analysis
        </button>
        <button 
          onClick={() => setActiveSubTab('sentiment')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${activeSubTab === 'sentiment' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <BarChart3 size={14} />
          Market Sentiment
        </button>
      </div>

      {activeSubTab === 'analysis' ? (
        <>
          <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Sparkles className="text-zinc-950" size={20} />
                </div>
                <h2 className="text-2xl font-bold">AI Portfolio Assistant</h2>
              </div>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Get personalized investment suggestions, SWOT analysis of your holdings, and deep market insights powered by Google Gemini. Our AI analyzes real-time data to help you make smarter trading decisions.
              </p>
              <button 
                onClick={handleAnalyze}
                disabled={loading || portfolio.length === 0}
                className="px-6 py-3 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/10"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Brain size={20} />}
                {analysis ? "Refresh Analysis" : "Analyze My Portfolio"}
              </button>
              {portfolio.length === 0 && (
                <p className="text-xs text-rose-400 mt-2 font-medium">Add stocks to your portfolio to enable AI analysis.</p>
              )}
            </div>
            
            <div className="absolute top-0 right-0 p-12 opacity-5 hidden lg:block">
              <Brain size={240} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {analysis ? (
                <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 prose prose-invert max-w-none">
                  <div className="flex items-center gap-2 mb-6 text-emerald-500">
                    <MessageSquare size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Gemini Analysis Report</span>
                  </div>
                  <div className="markdown-body">
                    <Markdown>{analysis}</Markdown>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                    <Zap size={32} />
                  </div>
                  <p className="text-zinc-500 font-medium">No analysis generated yet</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Shield size={18} className="text-emerald-500" />
                  AI Risk Assessment
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Diversification</span>
                      <span className="text-xs font-bold text-emerald-500">GOOD</span>
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%]"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Volatility Risk</span>
                      <span className="text-xs font-bold text-amber-500">MEDIUM</span>
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <SentimentDashboard />
      )}
    </div>
  );
};
