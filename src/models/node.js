import mongoose, { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import uniqueValidator from 'mongoose-unique-validator'

const NodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  nodeLevel: {
    default: 0,
    type: Number
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Node'
    }
  ],
  moderators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})
// auto-timestamp plugin
NodeSchema.plugin(timestamp)
NodeSchema.plugin(uniqueValidator)

export default mongoose.model('Node', NodeSchema)
