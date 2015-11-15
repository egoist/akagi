import test from 'ava'
import { User } from './lib'

test('main', async t => {
  const userdata = {
    username: 'kevin',
    email: 'i@0x.me',
    password: '122345'
  }
  try {
    const result = await User.signUp(userdata)
    t.ok(result && result.username)
  } catch(err) {
    t.fail(err.message)
  }
})
