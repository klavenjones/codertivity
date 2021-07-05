import mongoose from 'mongoose'

const BoardSchema = new mongoose.Schema({
  id: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  lanes: []
})

export default mongoose.models.Board || mongoose.model('Board', BoardSchema)
