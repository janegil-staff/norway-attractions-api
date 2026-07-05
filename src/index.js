// src/index.js
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';

import { connectDb } from './config/db.js';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';
import { resolveApiKey } from './middleware/apiKeyAuth.js';

const PORT = process.env.PORT || 4000;
const REQUIRE_KEY = process.env.REQUIRE_API_KEY === 'true'; // off in dev, on in prod

async function start() {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/norway_attractions');

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { apiKey, error } = await resolveApiKey(req);
        // In dev (REQUIRE_KEY=false) we allow anonymous access for the playground.
        if (REQUIRE_KEY && !apiKey) {
          throw new Error(error || 'API key required. Include x-api-key header.');
        }
        return { apiKey };
      },
    })
  );

  app.get('/health', (_req, res) => res.json({ ok: true }));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Norway Attractions API ready at http://localhost:${PORT}/graphql`);
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});