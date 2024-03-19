var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
let Book = class Book {
};
__decorate([
    PrimaryGeneratedColumn('uuid')
], Book.prototype, "id", void 0);
__decorate([
    CreateDateColumn()
], Book.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn()
], Book.prototype, "updatedAt", void 0);
__decorate([
    Column({ type: 'varchar' })
], Book.prototype, "title", void 0);
__decorate([
    Column({ type: 'varchar' })
], Book.prototype, "author", void 0);
__decorate([
    Column({ type: 'varchar' })
], Book.prototype, "description", void 0);
Book = __decorate([
    Entity()
], Book);
export { Book };
//# sourceMappingURL=Book.js.map