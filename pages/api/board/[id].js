import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { Board, User } from '../../../models'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  const session = await getSession({ req })
  //Retrieve Email
  const { email } = session.user
  const user = await User.findOne({ email })
  
  await dbConnect()

  if (session) {
    switch (method) {
      case 'GET':
        //Find user associated with account
        const board = await Board.find({ userId: user._id })
        if (!board) {
          return res.status(404).json({ success: false, error: 'Not Found' })
        }
        return res.status(200).json({ success: true, data: board })
        break

      case 'PUT':
        console.log('PUT METHOD', req.body)
        //Find user associated with account
        const updated = await Board.updateOne({ userId: user._id }, req.body, {
          new: true,
          runValidators: true
        })
        console.log('UPDATED', updated)

        if (!updated) {
          return res
            .status(400)
            .json({ success: false, error: 'Something went wrong' })
        }
        return res.status(200).json({ success: true, data: updated })

        break

      case 'DELETE':
        const deleted = await Board.deleteOne({ _id: id })
        if (!deleted) {
          return res
            .status(400)
            .json({ success: false, error: 'Something went wrong' })
        }
        return res.status(200).json({ success: true, data: {} })

        break

      default:
        return res
          .status(400)
          .json({ success: false, error: 'Something went wrong' })

        break
    }
  } else {
    res.send({
      error: 'You must be logged in to access this content.'
    })
  }
}
