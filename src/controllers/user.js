import User from '../models/user'
import { everyTrusty, hasEssentialKeys } from '../helpers/object'

export function signUp (userdata) {
  return new Promise(async function (resolve, reject) {
    if (!everyTrusty(userdata) || !hasEssentialKeys(userdata, ['username', 'email', 'password'])) {
      console.log('ha')
      return reject({error: 'user validation error', messages: ['User info is not complete']})
    }
    const user = new User({
      username: userdata.username,
      email: userdata.email,
      password: userdata.password
    })
    try {
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
