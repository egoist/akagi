import test from 'ava'
import Akagi from './akagi'

const user_cache = {
  username: Date.now().toString(),
  password: '123456'
}
let member

test.serial('user signup', async t => {
  const userdata = {
    username: user_cache.username,
    email: `i@${Date.now()}.com`,
    password: user_cache.password
  }
  try {
    const result = member = await Akagi.User.signUp(userdata)
    t.ok(result && result.email)
  } catch(err) {
    t.fail(err.messages.join('\n'))
  }
})

test.serial('user signin', async t => {
  const userdata = {
    account: user_cache.username,
    password: user_cache.password
  }
  try {
    const result = await Akagi.User.signIn(userdata)
    t.ok(userdata && !userdata.error)
  } catch(err) {
    t.fail(err.messages.join('\n'))
  }
})

test.serial('user auth', async t => {
  try {
    const user = await Akagi.User.auth(member)
    t.pass(user && user.apiKey)
  } catch(err) {
    t.fail(err.messages.join('\n'))
  }
})
