import { Repository } from 'typeorm'
import { Book } from '../models/Book.js'
import AppDataSource from '../constants/appDataSource.js'
import { Book as BookObject, BookInput } from '../constants/interfaces.js'

export class BookRepo {
  private bookRepository: Repository<Book>

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book)
  }

  async getBooks() {
    try {
      return await this.bookRepository.find()
    } catch (error) {
      console.log('Error in BookRepo.getBooks:', error)
      throw error
    }
  }

  async getBook(id: string) {
    try {
      return await this.bookRepository.findOne({ where: { id } })
    } catch (error) {
      console.log('Error in BookRepo.getBook:', error)
      throw error
    }
  }

  async createBook(input: BookInput) {
    try {
      return await this.bookRepository.save([input])
    } catch (error) {
      console.log('Error in BookRepo.createBook:', error)
      throw error
    }
  }

  async updateBook(id: string, input: BookObject) {
    try {
      const existingBook = await this.bookRepository.findOne({ where: { id } })
      if (!existingBook) {
        throw new Error('Book not found')
      }
      const updatedBook = Object.assign(existingBook, input)
      return await this.bookRepository.save([updatedBook])
    } catch (error) {
      console.log('Error in BookRepo.updateBook:', error)
      throw error
    }
  }

  async deleteBook(id: string) {
    try {
      const bookToRemove = await this.bookRepository.findOne({ where: { id } })
      if (!bookToRemove) {
        throw new Error('Book not found')
      }
      await this.bookRepository.softRemove([bookToRemove])
    } catch (error) {
      console.log('Error in BookRepo.deleteBook:', error)
      throw error
    }
  }
}
