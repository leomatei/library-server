import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './constants/schema.js';
import { root } from './routes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use('/', (_req, res) => {
    res.send('Server is running!');
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/api`);
});
export default app;
//# sourceMappingURL=index.js.map