import { QdrantClient } from '@qdrant/js-client-rest';

export class VectorService {
  private client: QdrantClient;
  private memoryStore: Record<string, any[]> = {};
  private isQdrantAvailable: boolean | null = null;

  constructor() {
    this.client = new QdrantClient({
      url: process.env.QDRANT_URL || 'http://localhost:6333',
      apiKey: process.env.QDRANT_API_KEY,
    });
  }

  async checkQdrant() {
    if (this.isQdrantAvailable !== null) return this.isQdrantAvailable;
    try {
      await this.client.getCollections();
      this.isQdrantAvailable = true;
    } catch {
      console.warn('Qdrant not available, falling back to memory store.');
      this.isQdrantAvailable = false;
    }
    return this.isQdrantAvailable;
  }

  async ensureCollection(collectionName: string) {
    if (!(await this.checkQdrant())) {
      if (!this.memoryStore[collectionName]) {
        this.memoryStore[collectionName] = [];
      }
      return;
    }

    try {
      const exists = await this.client.getCollections().then(res => res.collections.some(c => c.name === collectionName));
      if (!exists) {
        await this.client.createCollection(collectionName, {
          vectors: { size: 768, distance: 'Cosine' }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async upsertVectors(collectionName: string, points: any[]) {
    await this.ensureCollection(collectionName);
    
    if (!(await this.checkQdrant())) {
      this.memoryStore[collectionName] = [...(this.memoryStore[collectionName] || []), ...points];
      return;
    }
    
    try {
      return await this.client.upsert(collectionName, { wait: true, points });
    } catch (e) {
      console.error(e);
      // Fallback
      this.memoryStore[collectionName] = [...(this.memoryStore[collectionName] || []), ...points];
    }
  }

  async search(collectionName: string, vector: number[], limit = 5) {
    if (!(await this.checkQdrant())) {
      const points = this.memoryStore[collectionName] || [];
      // Simple mockup search for memory store using basic slice
      return points.slice(0, limit);
    }

    try {
      return await this.client.search(collectionName, { vector, limit });
    } catch (e) {
      console.error(e);
      const points = this.memoryStore[collectionName] || [];
      return points.slice(0, limit);
    }
  }
}
