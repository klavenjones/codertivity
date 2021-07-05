import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { Lane } from '../../../models'

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
        const lane = await Lane.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!lane) {
          res.status(404).json({ success: false, error: 'Not Found' })
        }
        res.status(200).json({ success: true, data: lane })

        break

      case 'PUT':
        const lane = await Lane.findById(id)
        if (!lane) {
          res
            .status(400)
            .json({ success: false, error: 'Something went wrong' })
        }
        res.status(200).json({ success: true, data: lane })

        break

      case 'DELETE':
        const lane = await Lane.findByIdAndDelete(id)
        if (!lane) {
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
