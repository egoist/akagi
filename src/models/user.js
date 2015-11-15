import mongoose, { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})
// auto-timestamp plugin
UserSchema.plugin(timestamp)
UserSchema.plugin(uniqueValidator)

export default mongoose.model('User', UserSchema)
