import { GoogleGenAI } from "@google/genai";
import { PortfolioItem, Stock } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzePortfolio(portfolio: PortfolioItem[], stocks: Stock[]) {
  const model = "gemini-3-flash-preview";
  
  const portfolioData = portfolio.map(item => {
    const stock = stocks.find(s => s.symbol === item.symbol);
    return {
      symbol: item.symbol,
      name: stock?.name || item.symbol,
      quantity: item.quantity,
      avgPrice: item.averagePrice,
      currentPrice: item.currentPrice,
      totalValue: item.quantity * item.currentPrice,
      profit: (item.currentPrice - item.averagePrice) * item.quantity
    };
  });

  const prompt = `
    Analyze the following stock portfolio and provide:
    1. Overall portfolio health assessment.
    2. Personalized investment suggestions (Buy/Hold/Sell recommendations with reasoning).
    3. SWOT analysis for the top 3 holdings.
    4. Market insights based on the current sector distribution.

    Portfolio Data:
    ${JSON.stringify(portfolioData, null, 2)}

    Please provide the response in a structured Markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Failed to generate AI analysis. Please try again later.";
  }
}

export async function getStockSentiment(symbol: string, news: any[]) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze the sentiment for the stock ${symbol} based on the following recent news headlines and summaries:
    ${JSON.stringify(news, null, 2)}

    Provide:
    1. A sentiment score from -1 (very bearish) to 1 (very bullish).
    2. A brief summary of why this sentiment exists.
    3. Key risks or opportunities identified in the news.

    Return the result in JSON format with keys: score, summary, risks, opportunities.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return null;
  }
}
