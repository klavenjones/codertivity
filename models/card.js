import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  label: {
    type: String
  },
  description: {
    type: String,
    maxlength: [400]
  },
  lane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lane',
    required: true
  },
  laneId: {
    type: String
  }
})

export default mongoose.models.Card || mongoose.model('Card', CardSchema)
