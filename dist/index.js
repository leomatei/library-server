var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    connectionString: `${process.env.REACT_APP_POSTGRES_URL}?sslmode=require`,
});
pool.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to PostgreSQL!');
});
const schema = buildSchema(`
  type Book{
    id: ID
    title: String
    author: String
    description: String
  }
  input BookInput {
    title: String
    author: String
    description: String
  }
  type Query {
    getBooks: [Book]
    getBook(id: ID): Book
  }
  type Mutation {
    createBook(input: BookInput): Book
    updateBook(id: ID, input: BookInput): Book
    deleteBook(id: ID): String
  }
`);
const root = {
    getBooks: () => __awaiter(void 0, void 0, void 0, function* () {
        const queryText = 'SELECT * FROM book';
        const client = yield pool.connect();
        try {
            const { rows } = yield client.query(queryText);
            return rows;
        }
        finally {
            client.release();
        }
    }),
    getBook: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        const queryText = 'SELECT * FROM book WHERE id = $1';
        const values = [id];
        const client = yield pool.connect();
        try {
            const { rows } = yield client.query(queryText, values);
            return rows[0];
        }
        finally {
            client.release();
        }
    }),
    createBook: function createBook(_a) {
        return __awaiter(this, arguments, void 0, function* ({ input }) {
            const queryText = 'INSERT INTO book (title, author, description) VALUES ($1, $2, $3) RETURNING *';
            const values = [input.title, input.author, input.description];
            const client = yield pool.connect();
            try {
                const { rows } = yield client.query(queryText, values);
                return rows[0];
            }
            finally {
                client.release();
            }
        });
    },
    updateBook: (_b) => __awaiter(void 0, [_b], void 0, function* ({ id, input }) {
        const queryText = 'UPDATE book SET title = $1, author = $2, description = $3 WHERE id = $4 RETURNING *';
        const values = [input.title, input.author, input.description, id];
        const client = yield pool.connect();
        try {
            const { rows } = yield client.query(queryText, values);
            return rows[0];
        }
        finally {
            client.release();
        }
    }),
    deleteBook: (_c) => __awaiter(void 0, [_c], void 0, function* ({ id }) {
        const queryText = 'DELETE FROM book WHERE id = $1';
        const values = [id];
        const client = yield pool.connect();
        try {
            yield client.query(queryText, values);
        }
        finally {
            client.release();
        }
    }),
};
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.use('/', (req, res) => {
    res.send('Server is running!');
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/api`);
});
export default app;
//# sourceMappingURL=index.js.map