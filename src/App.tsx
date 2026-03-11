/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MarketDashboard } from './components/MarketDashboard';
import { PortfolioView } from './components/PortfolioView';
import { AIInsights } from './components/AIInsights';
import { StockDetails } from './components/StockDetails';
import { Backtesting } from './components/Backtesting';
import { VirtualTradingProvider } from './contexts/VirtualTradingContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'market':
        return <MarketDashboard onStockSelect={setSelectedStock} />;
      case 'portfolio':
        return <PortfolioView />;
      case 'ai':
        return <AIInsights />;
      case 'trading':
        return <Backtesting />;
      default:
        return <MarketDashboard onStockSelect={setSelectedStock} />;
    }
  };

  return (
    <VirtualTradingProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
        {selectedStock && (
          <StockDetails 
            symbol={selectedStock} 
            onClose={() => setSelectedStock(null)} 
          />
        )}
      </Layout>
    </VirtualTradingProvider>
  );
}
