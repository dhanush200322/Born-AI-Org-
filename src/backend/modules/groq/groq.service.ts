import { Groq } from 'groq-sdk';

export class GroqService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy-key' });
  }

  async generateChatCompletion(messages: any[], model = 'llama-3.3-70b-versatile', stream = false) {
    return this.groq.chat.completions.create({
      messages,
      model,
      temperature: 0.7,
      max_tokens: 4096,
      stream,
    });
  }
}
