import Controller from '../controllers/main.js'
import express from 'express'

const router = express.Router()
const controller = new Controller()

router.post('/', controller.POST)
router.post('/:userId', controller.POST)



export default router