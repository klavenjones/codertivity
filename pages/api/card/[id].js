import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { Card } from '../../../models'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  const session = getSession({ req })

  await dbConnect()

  if (session) {
    switch (method) {
      case 'GET':
        const card = await Card.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!card) {
          res.status(404).json({ success: false, error: 'Not Found' })
        }
        res.status(200).json({ success: true, data: card })

        break

      case 'PUT':
        const card = await Card.findById(id)
        if (!card) {
          res
            .status(400)
            .json({ success: false, error: 'Something went wrong' })
        }
        res.status(200).json({ success: true, data: card })

        break

      case 'DELETE':
        const card = await Card.findByIdAndDelete(id)
        if (!card) {
          res
            .status(400)
            .json({ success: false, error: 'Something went wrong' })
        }
        res.status(200).json({ success: true, data: {} })

        break

      default:
        res
          .status(400)
          .json({ success: false, error: 'Unable to perform this operation' })
        break
    }
  } else {
    res.send('You must be logged in to access this content')
  }
}
