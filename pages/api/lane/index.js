import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { Lane, Board } from '../../../models'

export default async function handler(req, res) {
  await dbConnect()

  const session = getSession({ req })
  const { method } = req

  if (session) {
    switch (method) {
      case 'GET':
        try {
          const lanes = await Lane.find({})
          res.status(200).json({ success: true, data: lanes })
        } catch (error) {
          res.status(404).json({ success: false, error: 'Not Found' })
        }

        break

      case 'POST':
        try {
          const { boardId } = req.body
          const lanes = await Lane.create(req.body).then(async (laneDoc) => {
            await Board.findByIdAndUpdate(
              boardId,
              {
                $push: { lanes: laneDoc }
              },
              { new: true, useFindAndModify: false }
            )

            return laneDoc
          })
          res.status(200).json({ success: true, data: lanes })
        } catch (error) {
          res.status(404).json({ success: false, error: 'Not Found' })
        }

        break
      default:
        console.log('Something went wrong')
        res.status(400).json({ success: false })
        break
    }
  } else {
    res.send({
      error: 'You must be logged in to view the content on this page.'
    })
  }
}
