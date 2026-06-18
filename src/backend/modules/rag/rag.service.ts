import { VectorService } from '../vector/vector.service';
import { GroqService } from '../groq/groq.service';

// Mock embedding generation (In real app, call a text-embedding API)
async function generateEmbedding(text: string): Promise<number[]> {
  return new Array(768).fill(0).map(() => Math.random());
}

export class RAGService {
  private vectorService: VectorService;
  private groqService: GroqService;

  constructor() {
    this.vectorService = new VectorService();
    this.groqService = new GroqService();
  }

  async retrieveContext(agentId: string, query: string) {
    const embedding = await generateEmbedding(query);
    const results = await this.vectorService.search(agentId, embedding, 5);
    return results.map(r => r.payload?.text).join('\n\n');
  }

  async generateRAGResponse(agentId: string, query: string, history: any[], systemPrompt: string, model: string) {
    const context = await this.retrieveContext(agentId, query);

    const mergedPrompt = `${systemPrompt}

You must answer ONLY using the retrieved knowledge below. If the answer is not available, clearly say: "I couldn't find this information in the uploaded knowledge base." Never hallucinate.

<context>
${context}
</context>`;

    const messages = [
      { role: 'system', content: mergedPrompt },
      ...history,
      { role: 'user', content: query }
    ];

    return this.groqService.generateChatCompletion(messages, model, true);
  }
}
