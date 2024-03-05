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
  type Query {
    getBooks: [Book]
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

// Create a resolver for the hello query
const root = {
  hello: () => 'Hello, GraphQL!',
  getBooks: () => books,
}

// Create an Express server
const app = express()
app.use(cors())
app.use(express.json())

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
