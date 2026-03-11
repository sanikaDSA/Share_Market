import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, Trade, Stock } from '../types';
import { MOCK_STOCKS } from '../constants';

interface VirtualTradingContextType {
  balance: number;
  portfolio: PortfolioItem[];
  trades: Trade[];
  buyStock: (symbol: string, quantity: number, price: number) => void;
  sellStock: (symbol: string, quantity: number, price: number) => void;
  getPortfolioValue: () => number;
}

const VirtualTradingContext = createContext<VirtualTradingContextType | undefined>(undefined);

export const VirtualTradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(1000000); // Start with 1M virtual currency
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);

  const buyStock = (symbol: string, quantity: number, price: number) => {
    const cost = quantity * price;
    if (balance < cost) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(prev => prev - cost);
    
    setPortfolio(prev => {
      const existing = prev.find(item => item.symbol === symbol);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        const newAvgPrice = (existing.averagePrice * existing.quantity + price * quantity) / newQuantity;
        return prev.map(item => item.symbol === symbol ? { ...item, quantity: newQuantity, averagePrice: newAvgPrice } : item);
      }
      return [...prev, { symbol, quantity, averagePrice: price, currentPrice: price }];
    });

    setTrades(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      type: 'BUY',
      quantity,
      price,
      timestamp: Date.now()
    }, ...prev]);
  };

  const sellStock = (symbol: string, quantity: number, price: number) => {
    const existing = portfolio.find(item => item.symbol === symbol);
    if (!existing || existing.quantity < quantity) {
      alert("Insufficient shares!");
      return;
    }

    const proceeds = quantity * price;
    setBalance(prev => prev + proceeds);

    setPortfolio(prev => {
      const newQuantity = existing.quantity - quantity;
      if (newQuantity === 0) {
        return prev.filter(item => item.symbol !== symbol);
      }
      return prev.map(item => item.symbol === symbol ? { ...item, quantity: newQuantity } : item);
    });

    setTrades(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      type: 'SELL',
      quantity,
      price,
      timestamp: Date.now()
    }, ...prev]);
  };

  const getPortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const stock = MOCK_STOCKS.find(s => s.symbol === item.symbol);
      return total + (item.quantity * (stock?.price || item.currentPrice));
    }, 0);
  };

  return (
    <VirtualTradingContext.Provider value={{ balance, portfolio, trades, buyStock, sellStock, getPortfolioValue }}>
      {children}
    </VirtualTradingContext.Provider>
  );
};

export const useVirtualTrading = () => {
  const context = useContext(VirtualTradingContext);
  if (!context) throw new Error("useVirtualTrading must be used within VirtualTradingProvider");
  return context;
};
