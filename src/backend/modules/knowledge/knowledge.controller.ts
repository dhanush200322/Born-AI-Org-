import { Router } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { chunkText } from '../../utils/chunking';
import { VectorService } from '../vector/vector.service';

const upload = multer({ storage: multer.memoryStorage() });
export const knowledgeRouter = Router();
const vectorService = new VectorService();

async function generateEmbedding(text: string): Promise<number[]> {
  return new Array(768).fill(0).map(() => Math.random());
}

knowledgeRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { agentId } = req.body;
    const file = req.file;

    if (!agentId || !file) {
      return res.status(400).json({ error: 'agentId and file are required' });
    }

    let textStr = '';
    
    // Quick parse based on mimetype
    if (file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(file.buffer);
      textStr = pdfData.text;
    } else {
      textStr = file.buffer.toString('utf-8');
    }

    // Clean text (remove multiple spaces)
    textStr = textStr.replace(/\\s+/g, ' ');

    const chunks = chunkText(textStr);
    const points = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await generateEmbedding(chunks[i]);
      points.push({
        id: crypto.randomUUID(),
        vector: embedding,
        payload: {
          text: chunks[i],
          chunkNumber: i,
          fileName: file.originalname,
        }
      });
    }

    await vectorService.upsertVectors(agentId, points);

    res.json({ success: true, chunksProcessed: chunks.length });
  } catch (err: any) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: err.message });
  }
});
