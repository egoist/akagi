import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/akagi-test')
import * as User from './controllers/user'

export default {
  User
}
