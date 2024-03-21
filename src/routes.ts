import { BookController } from './controllers/bookController.js'
import { Book, BookInput } from './constants/interfaces.js'

const Books = new BookController()

export const root = {
  getBooks: async () => await Books.getBooks(),
  getBook: async ({ id }: { id: string }) => await Books.getBook(id),
  createBook: async ({ input }: { input: BookInput }) =>
    await Books.createBook(input),
  updateBook: async ({ id, input }: { id: string; input: Book }) =>
    await Books.updateBook(id, input),
  deleteBook: async ({ id }: { id: string }) => Books.deleteBook(id),
}
