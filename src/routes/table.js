import Controller from '../controllers/table.js'
import express from 'express'

const router = express.Router()
const controller = new Controller()

router.get('/', controller.GET)
router.get('/pendings/', controller.PENDING)
router.get('/:barberId/', controller.GET)
router.put('/update/approvaltype/', controller.UPDATE_APPROVAL_TYPE)
router.put('/update/iscomplated/', controller.UPDATE_COMPLATED)


export default router