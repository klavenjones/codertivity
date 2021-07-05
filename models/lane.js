import mongoose from 'mongoose'

const LaneSchema = new mongoose.Schema({
  id: {
    type: String
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ]
})

export default mongoose.models.Lane || mongoose.model('Lane', LaneSchema)
