import mongoose from 'mongoose'
import * as User from './controllers/user'

export default class Akagi {
  static User = User
  constructor (config) {
    this.config = config || {}
    this.config.url = this.config.url || 'mongodb://localhost/akagi-test'
    mongoose.connect(this.config.url)
  }
}
