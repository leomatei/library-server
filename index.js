// server.js
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')

// Define your GraphQL schema
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

let books = [
  {
    id: 1,
    title: 'book1',
    author: 'author1',
    description:
      'desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1desc1',
  },
  { id: 2, title: 'book2', author: 'author2', description: 'desc2' },
  { id: 3, title: 'book3', author: 'author3', description: 'desc3' },
]

const root = {
  getBooks: () => books,
  getBook: ({ id }) => {
    const index = books.findIndex((book) => book.id == id)
    if (index !== -1) {
      return books[index]
    }
    return null
  },
  createBook: ({ input }) => {
    const newBook = { id: books.length + 1, ...input }
    books.push(newBook)
    return newBook
  },
  updateBook: ({ id, input }) => {
    const index = books.findIndex((book) => book.id == id)
    if (index !== -1) {
      books[index] = { ...books[index], ...input }
      return books[index]
    }
    return null
  },
  deleteBook: ({ id }) => {
    const index = books.findIndex((book) => book.id == id)
    if (index !== -1) {
      books.splice(index, 1)
      return `Book with ID ${id} deleted successfully.`
    }
    return `Book with ID ${id} not found.`
  },
}

// Create an Express server
const app = express()

app.use(cors())

app.use(express.json())

app.use('/', (req, res) => {
  res.send('server is runing.')
})
// Set up the /graphql endpoint with the GraphQL middleware
app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for easy testing
  })
)

// Start the server on port 4000
const PORT = 4000
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/api`)
})
