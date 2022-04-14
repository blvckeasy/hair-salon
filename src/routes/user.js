import Controller from '../controllers/user.js'
import express from 'express'

const router = express.Router()
const controller = new Controller()

router.get('/', controller.GET)
router.get('/:userId', controller.GET)


export default router