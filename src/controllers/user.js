import User from '../models/user'
import { everyTrusty, hasEssentialKeys } from '../helpers/object'
import * as bcrypt from '../helpers/bcrypt'

export function signUp (userdata) {
  return new Promise(async function (resolve, reject) {
    if (!hasEssentialKeys(userdata, ['username', 'email', 'password'])) {
      console.log('ha')
      return reject({error: 'user validation error', messages: ['User info is not complete']})
    }
    const user = new User({
      username: userdata.username,
      email: userdata.email,
      password: userdata.password
    })
    try {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hashPassword(user.password, salt)
      resolve(await user.save())
    } catch(err) {
      const messages = []
      for(const i in err.errors) {
        messages.push(err.errors[i].message)
      }
      reject({ error: err.message, messages })
    }
  })
}

export function signIn (userdata) {
  return new Promise(async function (resolve, reject) {
    if (!hasEssentialKeys(userdata, ['account', 'password'])) {
      console.log('ha')
      return reject({error: 'user validation error', messages: ['User info is not complete']})
    }
    const query = User.findOne()
    query.or([{username: userdata.account}, {email: userdata.account}])
    try {
      const user = await query.exec()
      const compare = user ? await bcrypt.comparePassword(user.password, userdata.password) : false
      if (compare) {
        resolve(user)
      } else {
        reject({error: 'User signIn error', messages: ['Your password mismatched']})
      }
    } catch(err) {
      reject(err)
    }
  })
}
