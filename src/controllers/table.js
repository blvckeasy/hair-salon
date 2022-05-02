import { verify } from '../utils/jwt.js'
import queries from '../../setup/queries.js'
import { fetchAll, fetch } from '../utils/postgres.js'

class Controller {
  async GET (req, res) {
    try {
      const { token } = req.body
      const { barberId } = req.params
      const user = verify(token)
      if (user.error) throw new Error(user.error)
      
      return res.json({
        message: "ok",
        data: await fetchAll(queries.getTableToday, barberId || null) || []
      })
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }

  async PENDING (req, res) {
    try {
      const { token } = req.body
      const user = verify(token)
      if (user.error) throw new Error(user.error)
      if (['client'].includes(user.role)) throw new Error('Only barber change this table !')

      return res.json({
        message: "ok",
        data: await fetchAll(queries.getAllPendings, user.id) || []
      })
      
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }

  async UPDATE_APPROVAL_TYPE (req, res) {
    try {
      
      const { token, tableId, approvalType } = req.body
      const user = verify(token)

      if (user.error) throw new Error(user.error)
      if (['client'].includes(user.role)) throw new Error('Only barber change this table !')
      
      return res.json({
        message: 'ok',
        data: await fetch(queries.updateApprovalType, user.id, tableId, approvalType) || {}
      })
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }

}



export default Controller