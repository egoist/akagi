import test from 'ava'
import Akagi from './akagi'

test('user signup', async t => {
  const userdata = {
    username: 'kevin',
    email: 'i@0x.me',
    password: '122345'
  }
  try {
    const result = await Akagi.User.signUp(userdata)
    t.ok(result && result.username)
  } catch(err) {
    t.fail(err.message)
  }
})
