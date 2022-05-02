import paginationMiddleware from './middlewares/pagination.js'
import modelMiddleware from './middlewares/model.js'
import tableRouter from './routes/table.js'
import mainRouter from './routes/main.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import { PORT, host } from '../config.js'
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.static('upload'))
app.use(modelMiddleware)
app.use(paginationMiddleware)
app.use('/api/table/', tableRouter)
app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)
app.use('/api/mainpage/', mainRouter)



app.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/api/`)
)
