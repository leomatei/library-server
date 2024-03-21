import { BookRepo } from './controllers/bookController.js'
import { Book, BookInput } from './constants/interfaces.js'

const BookRepository = new BookRepo()

export const root = {
  getBooks: async () => await BookRepository.getBooks(),
  getBook: async ({ id }: { id: string }) => await BookRepository.getBook(id),
  createBook: async ({ input }: { input: BookInput }) =>
    await BookRepository.createBook(input),
  updateBook: async ({ id, input }: { id: string; input: Book }) =>
    await BookRepository.updateBook(id, input),
  deleteBook: async ({ id }: { id: string }) => BookRepository.deleteBook(id),
}
