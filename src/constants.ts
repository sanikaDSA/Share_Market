import { Stock, MarketIndex, NewsItem } from "./types";

export const MOCK_STOCKS: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2945.60,
    change: 12.45,
    changePercent: 0.42,
    volume: 5600000,
    marketCap: "19.8T",
    peRatio: 28.4,
    high: 2960.00,
    low: 2930.00,
    open: 2935.00,
    close: 2933.15,
    sector: "Energy",
    description: "Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles."
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 4120.35,
    change: -45.20,
    changePercent: -1.08,
    volume: 2100000,
    marketCap: "14.9T",
    peRatio: 31.2,
    high: 4180.00,
    low: 4110.00,
    open: 4175.00,
    close: 4165.55,
    sector: "Technology",
    description: "Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is a part of the Tata Group and operates in 150 locations across 46 countries."
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1450.20,
    change: 5.80,
    changePercent: 0.40,
    volume: 12000000,
    marketCap: "11.2T",
    peRatio: 18.5,
    high: 1465.00,
    low: 1440.00,
    open: 1445.00,
    close: 1444.40,
    sector: "Banking",
    description: "HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is India's largest private sector bank by assets and the world's tenth largest bank by market capitalization as of May 2024."
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1620.45,
    change: 18.30,
    changePercent: 1.14,
    volume: 4500000,
    marketCap: "6.7T",
    peRatio: 25.8,
    high: 1635.00,
    low: 1600.00,
    open: 1605.00,
    close: 1602.15,
    sector: "Technology",
    description: "Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services. The company was founded in Pune and is headquartered in Bangalore."
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 1085.90,
    change: -2.15,
    changePercent: -0.20,
    volume: 8900000,
    marketCap: "7.6T",
    peRatio: 17.2,
    high: 1095.00,
    low: 1080.00,
    open: 1088.00,
    close: 1088.05,
    sector: "Banking",
    description: "ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in Mumbai. It offers a wide range of banking products and financial services for corporate and retail customers."
  }
];

export const MOCK_INDICES: MarketIndex[] = [
  { name: "NIFTY 50", value: 22350.45, change: 125.30, changePercent: 0.56 },
  { name: "SENSEX", value: 73650.12, change: 410.25, changePercent: 0.56 },
  { name: "NIFTY BANK", value: 47850.60, change: -120.45, changePercent: -0.25 },
  { name: "NIFTY IT", value: 36200.15, change: 350.80, changePercent: 0.98 }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Reliance Industries to expand green energy portfolio",
    summary: "Reliance Industries announced a new $10 billion investment in green hydrogen and solar energy projects over the next three years.",
    source: "Economic Times",
    timestamp: Date.now() - 3600000,
    url: "#",
    sentiment: "positive"
  },
  {
    id: "2",
    title: "IT Sector faces headwinds amid global slowdown",
    summary: "Major IT firms including TCS and Infosys report cautious outlook for the next quarter due to reduced spending by US clients.",
    source: "Reuters",
    timestamp: Date.now() - 7200000,
    url: "#",
    sentiment: "negative"
  },
  {
    id: "3",
    title: "HDFC Bank reports strong Q3 earnings",
    summary: "HDFC Bank's net profit rose by 18% year-on-year, beating analyst expectations driven by strong loan growth.",
    source: "Bloomberg",
    timestamp: Date.now() - 10800000,
    url: "#",
    sentiment: "positive"
  }
];
