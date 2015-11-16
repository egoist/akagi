import test from 'ava'
import Akagi from './_akagi'
import { UserModel } from './_models'

const userCache = {
  username: Date.now().toString(),
  password: '123456',
}
let member
test.before('user signup', async t => {
  const userdata = {
    username: userCache.username,
    email: `i@${Date.now()}.com`,
    password: userCache.password,
  }
  try {
    const result = member = await Akagi.User.signUp(userdata)
    t.ok(result && result.email)
  } catch (err) {
    t.fail(err.messages.join('\n'))
  }
})
test.after('clean', t => {
  UserModel.remove({}, err => {
    if (err) {
      throw err
    }
    t.end()
  })
})


test.serial('user signin', async t => {
  const userdata = {
    account: userCache.username,
    password: userCache.password,
  }
  try {
    const result = await Akagi.User.signIn(userdata)
    t.ok(result && !result.error)
  } catch (err) {
    t.fail(err.messages.join('\n'))
  }
})

test.serial('user auth', async t => {
  try {
    const user = await Akagi.User.auth(member)
    t.pass(user && user.apiKey)
  } catch (err) {
    t.fail(err.messages.join('\n'))
  }
})
