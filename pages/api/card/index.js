import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { Card, Lane } from '../../../models'

export default async function handler(req, res) {
  await dbConnect()

  const session = getSession({ req })
  const { method } = req

  if (session) {
    switch (method) {
      case 'GET':
        try {
          const cards = await Card.find({})
          res.status(200).json({ success: true, data: cards })
        } catch (error) {
          res.status(404).json({ success: false, error: 'Not Found' })
        }

        break

      case 'POST':
        try {
          const { laneId } = req.body
          const lane = await Lane.findOne({ id: laneId })
          if (!lane) {
            res
              .status(400)
              .json({ success: false, error: 'Something went wrong' })
          }
          const newCard = { lane: lane._id, ...req.body }

          const cards = await Card.create(newCard).then(async (cardDoc) => {
            await Lane.findByIdAndUpdate(
              lane._id,
              {
                $push: { cards: { _id: cardDoc._id } }
              },
              { new: true, useFindAndModify: false }
            )
            return cardDoc
          })
          res.status(200).json({ success: true, data: cards })
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
