import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { apiRouter } from "./src/backend/app";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mount modular backend architecture router
  app.use("/api/v1", apiRouter);

  // API Routes
  app.post("/api/optimize-prompt", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
      }
      
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });
      
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `You are an expert AI prompt engineer.
Please optimize the following system prompt to be more robust, clear, and effective for an AI agent. 
Keep the core intent identical but improve formatting, specific instructions, and clarity.
Return ONLY the optimized prompt text without any markdown blocks or intro/outro text.

Original Prompt:
${prompt}`,
      });
      
      res.json({ optimizedPrompt: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to optimize prompt" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        return res.status(500).json({ error: "RESEND_API_KEY environment variable is required" });
      }

      const resend = new Resend(resendApiKey);
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // resend test domain
        to: "ro224313@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
