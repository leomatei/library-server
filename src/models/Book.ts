import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['code'])
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar' })
  author: string

  @Column({ type: 'varchar' })
  description: string
}