import paginationMiddleware from './middlewares/pagination.js'
import modelMiddleware from './middlewares/model.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import { PORT, host } from '../config.js'
import express from 'express'

const app = express()

app.use(express.json())
app.use(modelMiddleware)
app.use(paginationMiddleware)
app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)



app.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/api/`)
)
