const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: `${process.env.REACT_APP_POSTGRES_URL}?sslmode=require`,
})

pool.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Connected to PostgreSQL!')
})

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
    try {
      const { rows } = await client.query(queryText)
      return rows
    } finally {
      client.release()
    }
  },
  getBook: async ({ id }) => {
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
  createBook: async function createBook({ input }) {
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
  updateBook: async ({ id, input }) => {
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
  deleteBook: async ({ id }) => {
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

const app = express()
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
app.use('/', (req, res) => {
  res.send('Server is running!')
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/api`)
})
