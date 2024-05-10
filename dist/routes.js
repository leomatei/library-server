var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BookController } from './controllers/bookController.js';
const Books = new BookController();
export const root = {
    getBooks: () => __awaiter(void 0, void 0, void 0, function* () { return yield Books.getBooks(); }),
    getBook: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) { return yield Books.getBook(id); }),
    createBook: (_b) => __awaiter(void 0, [_b], void 0, function* ({ input }) { return yield Books.createBook(input); }),
    updateBook: (_c) => __awaiter(void 0, [_c], void 0, function* ({ id, input }) { return yield Books.updateBook(id, input); }),
    deleteBook: (_d) => __awaiter(void 0, [_d], void 0, function* ({ id }) { return Books.deleteBook(id); }),
};
//# sourceMappingURL=routes.js.map