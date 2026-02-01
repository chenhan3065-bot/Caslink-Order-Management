
import { GoogleGenAI } from "@google/genai";
import { Order, Language } from "../types";

export const getLogisticsAssistance = async (prompt: string, orders: Order[], lang: Language) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const langNames = { zh: 'Chinese', en: 'English', ms: 'Malay' };

  const systemInstruction = `
    You are the Caslink Logistics AI Assistant. 
    The user's preferred language is ${langNames[lang]}. Please respond in ${langNames[lang]}.
    
    You have access to the following current order database:
    ${JSON.stringify(orders, null, 2)}
    
    Guidelines:
    1. Be professional, efficient, and concise.
    2. If a user asks about a specific order ID or customer, check the database and provide details.
    3. If an order isn't found, suggest they check the tracking ID again.
    4. You can also provide general logistics advice (shipping times, handling dimensions).
    5. Always refer to the user as "Customer Support Associate" or similar.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    const errorMsgs = {
      zh: "抱歉，目前连接追踪网络时遇到困难。请稍后重试。",
      en: "I'm sorry, I'm having trouble connecting to the tracking network right now. Please try again later.",
      ms: "Maaf, saya menghadapi masalah menyambung ke rangkaian penjejakan buat masa ini. Sila cuba lagi kemudian."
    };
    return errorMsgs[lang];
  }
};
