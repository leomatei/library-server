import { DataSource } from 'typeorm'
import { Book } from './models/Book.js'

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
    rejectUnauthorized: false, // You may need to set this option if using self-signed certificates, but it's less secure
  },
  extra: {
    ssl: {
      rejectUnauthorized: false, // Additional option for some PostgreSQL drivers
    },
  },
})
AppDataSource.initialize()
  .then(() => {
    console.log('appdatasource connected')
  })
  .catch((error) => console.log(error))

export default AppDataSource
