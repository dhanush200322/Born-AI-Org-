import { Router } from 'express';
import { chatRouter } from './modules/chat/chat.controller';
import { knowledgeRouter } from './modules/knowledge/knowledge.controller';

export const apiRouter = Router();

apiRouter.use('/chat', chatRouter);
apiRouter.use('/knowledge', knowledgeRouter);

// More routes like agents, auth, memory would be registered here
