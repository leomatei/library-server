import express, { Express } from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { schema } from './constants/schema.js'
import { root } from './routes.js'

const app: Express = express()
app.use(cors())
app.use(express.json())

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.use('/', (_req: express.Request, res: express.Response) => {
  res.send('Server is running!')
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/api`)
})

export default app
