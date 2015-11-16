import uuid from 'node-uuid'
import User from '../models/user'
import { hasEssentialKeys } from '../helpers/object'
import * as bcrypt from '../helpers/bcrypt'
import mongoErrors from '../helpers/mongo-errors'

export function signUp (userData) {
  return new Promise(async (resolve, reject) => {
    if (!hasEssentialKeys(userData, ['username', 'email', 'password'])) {
      return reject({ error: 'user validation error', messages: ['User info is not complete'] })
    }
    const user = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      apiKey: uuid.v4()
    })
    try {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hashPassword(user.password, salt)
      resolve(await user.save())
    } catch(err) {
      reject(mongoErrors(err))
    }
  })
}

export function signIn (userData) {
  return new Promise(async (resolve, reject) => {
    if (!hasEssentialKeys(userData, ['account', 'password'])) {
      console.log('ha')
      return reject({ error: 'user validation error', messages: ['User info is not complete'] })
    }
    const query = User.findOne()
    query.or([{ username: userData.account }, { email: userData.account }])
    try {
      const user = await query.exec()
      const compare = user ? await bcrypt.comparePassword(user.password, userData.password) : false
      if (compare) {
        resolve(user)
      } else {
        reject({ error: 'User signIn error', messages: ['Your password mismatched'] })
      }
    } catch(err) {
      reject(mongoErrors(err))
    }
  })
}

export function auth (userData) {
  return new Promise(async (resolve, reject) => {
    if (!hasEssentialKeys(userData, ['_id', 'apiKey'])) {
      return reject({ error: 'User auth error', messages: ['User auth info not complete'] })
    }
    const query = User.findOne({ _id: userData._id, apiKey: userData.apiKey })
    try {
      const user = await query.exec()
      if (!user) {
        return reject({ error: 'User auth error', messages: ['Could not auth such user'] })
      }
      resolve(user)
    } catch(err) {
      reject(mongoErrors(err))
    }
  })
}
