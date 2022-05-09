import { createServer } from "http"
import { Server } from "socket.io"
import express from 'express'
import path from "path"

import paginationMiddleware from './middlewares/pagination.js'
import modelMiddleware from './middlewares/model.js'
import tableRouter from './routes/table.js'
import mainRouter from './routes/main.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import { PORT, host } from '../config.js'


const app = express()
const httpServer = createServer(app)

app.use(express.json())
app.use(express.static('upload'))
app.use(modelMiddleware)
app.use(paginationMiddleware)
app.use('/api/table/', tableRouter)
app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)
app.use('/api/mainpage/', mainRouter)

const io = new Server(httpServer,{
  cors: {
    origin: "http://192.168.1.107:3000"
  }
})


io.on("connection", (socket) => {
  console.log(socket)
})



httpServer.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/api/`)
)
