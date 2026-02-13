
import { GoogleGenAI } from "@google/genai";
import { Stock, Portfolio } from "../types";

// Use VITE_ environment variables for Vite projects.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const getStockInsight = async (stock: Stock): Promise<string> => {
    try {
        const prompt = `
      Analyze the following financial asset for a retail investor:
      Name: ${stock.name} (${stock.symbol})
      Current Price: $${stock.price}
      Daily Change: ${stock.changePercent}%
      Type: ${stock.type}

      Provide a concise, 2-sentence summary of what this type of movement usually implies and a brief generic tip for investors considering this asset. Keep it professional but accessible. Do not give financial advice.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        return response.text || "Insight currently unavailable.";
    } catch (error) {
        console.error("Error fetching Gemini insight:", error);
        return "AI insights are temporarily unavailable. Please check back later.";
    }
};

export const getPortfolioAdvice = async (holdings: { symbol: string, value: number }[], totalValue: number): Promise<string> => {
    try {
        const holdingsSummary = holdings.map(h => `${h.symbol}: $${h.value.toFixed(2)}`).join(', ');
        const prompt = `
            I have a portfolio worth $${totalValue.toFixed(2)} distributed as follows: ${holdingsSummary}.
            Give me a short, friendly paragraph of feedback on diversification. Keep it under 50 words.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        return response.text || "Portfolio analysis unavailable.";
    } catch (error) {
        console.error("Error fetching portfolio advice:", error);
        return "Portfolio analysis temporarily unavailable.";
    }
}

export const getPortfolioDeepAnalysis = async (portfolio: Portfolio, stocks: Stock[]): Promise<string> => {
    try {
        const holdingsData = portfolio.holdings.map(h => {
            const stock = stocks.find(s => s.symbol === h.symbol);
            return `${h.symbol} (${stock?.name || 'Unknown'}): ${h.quantity} shares @ $${stock?.price}, Type: ${stock?.type}`;
        }).join('\n');

        const prompt = `
            Act as a senior financial analyst. Analyze this portfolio structure deeply:
            Cash Balance: $${portfolio.cashBalance}
            Holdings:
            ${holdingsData}

            Provide a report in Markdown format with the following sections:
            1. **Risk Assessment**: (Low/Med/High) and why.
            2. **Sector Exposure**: Where is the money concentrated?
            3. **Opportunities**: 1 or 2 generic suggestions for improvement (e.g., "Consider adding bonds").
            4. **Verdict**: One sentence summary.
            
            Keep it professional, insightful, yet concise (under 200 words).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt,
        });

        return response.text || "Deep analysis unavailable.";
    } catch (error) {
        console.error("Error fetching deep analysis:", error);
        return "System is currently unable to generate deep analysis.";
    }
};

export const askPortfolioQuestion = async (question: string, portfolio: Portfolio, stocks: Stock[]): Promise<string> => {
    try {
        const holdingsData = portfolio.holdings.map(h => h.symbol).join(', ');

        const prompt = `
            Context: User has a portfolio containing [${holdingsData}] and $${portfolio.cashBalance} cash.
            User Question: "${question}"
            
            Answer the user's question specifically regarding their portfolio context. Be helpful, cautious, and do not provide specific financial advice (use phrases like "typically", "consider", "historical data suggests"). Keep it short (under 3 sentences).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        return response.text || "I couldn't process that question.";
    } catch (error) {
        console.error("Error answering question:", error);
        return "I'm having trouble connecting to the market data right now.";
    }
};
