var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Book } from '../models/Book.js';
import AppDataSource from '../constants/appDataSource.js';
export class BookController {
    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookRepository.find();
            }
            catch (error) {
                console.log('Error in BookRepo.getBooks:', error);
                throw error;
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookRepository.findOne({ where: { id } });
            }
            catch (error) {
                console.log('Error in BookRepo.getBook:', error);
                throw error;
            }
        });
    }
    createBook(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookRepository.save([input]);
            }
            catch (error) {
                console.log('Error in BookRepo.createBook:', error);
                throw error;
            }
        });
    }
    updateBook(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingBook = yield this.bookRepository.findOne({ where: { id } });
                if (!existingBook) {
                    throw new Error('Book not found');
                }
                const updatedBook = Object.assign(existingBook, input);
                return yield this.bookRepository.save([updatedBook]);
            }
            catch (error) {
                console.log('Error in BookRepo.updateBook:', error);
                throw error;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookToRemove = yield this.bookRepository.findOne({ where: { id } });
                if (!bookToRemove) {
                    throw new Error('Book not found');
                }
                yield this.bookRepository.softRemove([bookToRemove]);
            }
            catch (error) {
                console.log('Error in BookRepo.deleteBook:', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=bookController.js.map