var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BookRepo } from '../controllers/bookController.js';
const BookRepository = new BookRepo();
const root = {
    getBooks: () => __awaiter(void 0, void 0, void 0, function* () { return yield BookRepository.getBooks(); }),
    getBook: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield BookRepository.getBook(id); }),
    createBook: ({ input }) => __awaiter(void 0, void 0, void 0, function* () { return yield BookRepository.createBook(input); }),
    updateBook: ({ id, input }) => __awaiter(void 0, void 0, void 0, function* () { return yield BookRepository.updateBook(id, input); }),
    deleteBook: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return BookRepository.deleteBook(id); }),
};
//# sourceMappingURL=routes.js.map