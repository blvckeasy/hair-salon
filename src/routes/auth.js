import Controller from '../controllers/auth.js'
import express from 'express'



const router = express.Router()
const controller = new Controller()

router.post('/login', controller.LOGIN)
router.post('/register', controller.REGISTER)


export default router