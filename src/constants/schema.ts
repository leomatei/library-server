import { buildSchema } from 'graphql'

export const schema = buildSchema(`
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
