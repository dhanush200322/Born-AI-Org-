export const chunkText = (text: string, maxTokens = 800, overlap = 100): string[] => {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (let i = 0; i < words.length; i++) {
    currentChunk.push(words[i]);
    if (currentChunk.length >= maxTokens) {
      chunks.push(currentChunk.join(' '));
      currentChunk = currentChunk.slice(currentChunk.length - overlap);
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
};
