import express, { Express, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'
import { getBooks } from './controllers/bookController.js'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: `${process.env.REACT_APP_POSTGRES_URL}?sslmode=require`,
})
pool.connect((err: Error | null) => {
  if (err) {
    throw err
  }
  console.log('Connected to PostgreSQL!')
})

interface Book {
  id: string
  title: string
  author: string
  description: string
}

interface BookInput {
  title: string
  author: string
  description: string
}

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
`)

const root = {
  getBooks: async () => {
    const queryText = 'SELECT * FROM book'
    const client = await pool.connect()
    console.log(await getBooks())
    try {
      const { rows } = await client.query(queryText)
      return rows
    } finally {
      client.release()
    }
  },
  getBook: async ({ id }: { id: string }) => {
    const queryText = 'SELECT * FROM book WHERE id = $1'
    const values = [id]
    const client = await pool.connect()
    try {
      const { rows } = await client.query(queryText, values)
      return rows[0]
    } finally {
      client.release()
    }
  },
  createBook: async function createBook({ input }: { input: BookInput }) {
    const queryText =
      'INSERT INTO book (title, author, description) VALUES ($1, $2, $3) RETURNING *'
    const values = [input.title, input.author, input.description]
    const client = await pool.connect()
    try {
      const { rows } = await client.query(queryText, values)
      return rows[0]
    } finally {
      client.release()
    }
  },
  updateBook: async ({ id, input }: { id: string; input: Book }) => {
    const queryText =
      'UPDATE book SET title = $1, author = $2, description = $3 WHERE id = $4 RETURNING *'
    const values = [input.title, input.author, input.description, id]
    const client = await pool.connect()
    try {
      const { rows } = await client.query(queryText, values)
      return rows[0]
    } finally {
      client.release()
    }
  },
  deleteBook: async ({ id }: { id: string }) => {
    const queryText = 'DELETE FROM book WHERE id = $1'
    const values = [id]
    const client = await pool.connect()
    try {
      await client.query(queryText, values)
    } finally {
      client.release()
    }
  },
}

const app: Express = express()
app.use(cors())
app.use(express.json())

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.use('/', (req: express.Request, res: express.Response) => {
  res.send('Server is running!')
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/api`)
})

export default app
