// src/controllers/bookController.ts

import { Book } from '../models/Book.js'
import AppDataSource from '../appDataSource.js'

const bookRepository = AppDataSource.getRepository(Book)

export const getBooks = async () => await bookRepository.find()
