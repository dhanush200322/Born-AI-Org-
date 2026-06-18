import { Router } from 'express';
import { RAGService } from '../rag/rag.service';

export const chatRouter = Router();
const ragService = new RAGService();

chatRouter.post('/', async (req, res) => {
  const { agentId, message, history, model, systemPrompt } = req.body;

  if (!agentId || !message) {
    return res.status(400).json({ error: 'agentId and message are required' });
  }

  try {
    const stream = await ragService.generateRAGResponse(
      agentId,
      message,
      history || [],
      systemPrompt || 'You are a helpful AI assistant.',
      model || 'llama-3.3-70b-versatile'
    ) as any;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }
    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
