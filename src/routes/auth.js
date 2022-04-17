import Controller from '../controllers/auth.js'
import express from 'express'
import multer from 'multer'

const router = express.Router()
const controller = new Controller()
const upload = multer()

router.post('/login', controller.LOGIN)
router.post('/register', upload.single('files'), controller.REGISTER)
router.post('/email', controller.EMAIL)


export default router