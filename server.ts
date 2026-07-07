import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, company, scope, budget, specs } = req.body;
      
      // Email sending logic (e.g. using Resend, SendGrid) would go here
      // const resendKey = process.env.RESEND_API_KEY;
      
      // WhatsApp messaging logic (e.g. using Twilio) would go here
      // const twilioSid = process.env.TWILIO_ACCOUNT_SID;

      console.log(`[Email Mock] Sending email to admin about new lead from ${name} (${company}) for ${scope}...`);
      console.log(`[WhatsApp Mock] Sending WhatsApp message to admin about new lead...`);

      // Mock successful response
      res.json({ success: true, message: "Contact information sent via Email and WhatsApp successfully." });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const { GoogleGenAI } = await import("@google/genai");
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set." });
      }

      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const systemInstruction = `You are the AI assistant for Devil Labs. 
      Devil Labs builds autonomous AI systems, AI agents, and high-performance full-stack web architectures for the modern enterprise.
      Core capabilities: AI Agent Development, Full-Stack Architecture, Enterprise DevOps, and Autonomous Intelligence.
      Pricing: Transparent pricing for enterprise retainers and full-stack sprints.
      Process: Engineered pipeline for deploying zero-tech-debt systems in weeks.
      Answer questions succinctly and professionally based on this context.`;

      // Convert messages to history format if needed, but for simplicity we can just send the last message
      // Or we can use the chat session. Let's just use generateContent with the history as contents.
      const contents = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: { systemInstruction },
      });

      res.json({ response: response.text });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
