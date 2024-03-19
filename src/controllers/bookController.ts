// src/controllers/bookController.ts

import { Book } from '../models/Book.ts'
import { AppDataSource } from '../appDataSource.ts'

const bookRepository = AppDataSource.getRepository(Book)

export const getBooks = async () => await bookRepository.find()
