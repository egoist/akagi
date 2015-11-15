import User from '../models/user'

export function signUp (userdata) {
  return new Promise(async function (resolve, reject) {
    const user = new User({
      username: userdata.username,
      email: userdata.email,
      password: userdata.password
    })
    try {
      resolve(await user.save())
    } catch(err) {
      reject(err)
    }
  })
}
