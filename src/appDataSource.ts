import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.REACT_APP_POSTGRES_HOST,
  port: 5432,
  username: process.env.REACT_APP_POSTGRES_USER,
  password: process.env.REACT_APP_POSTGRES_PASSWORD,
  database: process.env.REACT_APP_POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
})
