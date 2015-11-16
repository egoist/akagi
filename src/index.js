import mongoose from 'mongoose'
import * as User from './controllers/user'
import * as Node from './controllers/node'

export default class Akagi {
  static User = User
  static Node = Node
  constructor(config) {
    this.config = config || {}
    this.config.url = this.config.url || 'mongodb://localhost/akagi-test'
    mongoose.connect(this.config.url)
  }
}
