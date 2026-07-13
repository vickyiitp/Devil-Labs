import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { serviceCategories } from "./src/data/services";

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

  // Dynamic Sitemap XML
  app.get("/sitemap.xml", (req, res) => {
    const host = req.headers.host || "devillabs.dev";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const staticPages = [
      { path: "/", priority: "1.0", changefreq: "daily" },
      { path: "/services", priority: "0.9", changefreq: "weekly" },
      { path: "/work", priority: "0.9", changefreq: "weekly" },
      { path: "/about", priority: "0.9", changefreq: "weekly" },
      { path: "/pricing", priority: "0.8", changefreq: "weekly" },
      { path: "/contact", priority: "0.8", changefreq: "monthly" },
      { path: "/process", priority: "0.7", changefreq: "monthly" },
      { path: "/insights", priority: "0.7", changefreq: "weekly" },
      { path: "/legal/privacy", priority: "0.3", changefreq: "monthly" },
      { path: "/legal/terms", priority: "0.3", changefreq: "monthly" },
      { path: "/legal/msa", priority: "0.3", changefreq: "monthly" },
    ];

    const currentDate = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic services pages from data/services.ts
    if (Array.isArray(serviceCategories)) {
      for (const category of serviceCategories) {
        if (category && Array.isArray(category.items)) {
          for (const item of category.items) {
            if (item && item.slug) {
              xml += `  <url>\n`;
              xml += `    <loc>${baseUrl}/services/${item.slug}</loc>\n`;
              xml += `    <lastmod>${currentDate}</lastmod>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.8</priority>\n`;
              xml += `  </url>\n`;
            }
          }
        }
      }
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
  });

  // Robots.txt
  app.get("/robots.txt", (req, res) => {
    const host = req.headers.host || "devillabs.dev";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    let txt = `User-agent: *\n`;
    txt += `Allow: /\n`;
    txt += `Disallow: /api/\n`;
    txt += `\n`;
    txt += `Sitemap: ${baseUrl}/sitemap.xml\n`;

    res.header("Content-Type", "text/plain");
    res.status(200).send(txt);
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
