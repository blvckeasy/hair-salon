import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import { PORT, host } from '../config.js'
import express from 'express'

const app = express()

app.use(express.json())
app.use('/api/users/', userRouter)
app.use('/api/auth/', authRouter)

app.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/api/`)
)
