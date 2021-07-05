import { getSession } from 'next-auth/client'
import { dbConnect } from '../../../lib'
import { User, Board } from '../../../models'

export default async function handler(req, res) {
  //Connect to Database
  await dbConnect()
  //Retrieve Current Session
  const session = await getSession({ req })
  //Retrieve Email
  const { email } = session.user
  //Retrieve Method
  const { method } = req
  //Only Logged in users can access this data
  if (session) {
    switch (method) {
      case 'GET':
        try {
          //Find user associated with account
          const user = await User.findOne({ email })
          //Find All boards associated with this user
          const board = await Board.find({ userId: user._id })
          res.status(200).json({ success: true, data: board })
        } catch (error) {
          console.log('Error', error.message)
          res.status(404).json({ success: true, error: 'Not Found' })
        }
        break

      case 'POST':
        try {
          //Find user associated with account
          const user = await User.findOne({ email })
          //Save the new board associated with the user
          const newBoard = { userId: user._id, ...req.body }
          const board = await Board.create(newBoard)
          res.status(201).json({ success: true, data: board })
        } catch (error) {
          console.log('Error', error.message)
          res.status(400).json({ success: true, error: 'Error Creating Board' })
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
