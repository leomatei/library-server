import { DataSource } from 'typeorm'
import { Book } from '../models/Book.js'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.REACT_APP_POSTGRES_HOST,
  port: 5432,
  username: process.env.REACT_APP_POSTGRES_USER,
  password: process.env.REACT_APP_POSTGRES_PASSWORD,
  database: process.env.REACT_APP_POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Book],
  subscribers: [],
  migrations: [],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to db!')
  })
  .catch((error) => console.log('Cannot connect to db!', error))

export default AppDataSource
