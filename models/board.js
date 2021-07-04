import mongoose from 'mongoose'

const BoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cards: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Cards',
      required: true
    }
  ]
})

export default mongoose.models.Boards || mongoose.models('Board', BoardSchema)
