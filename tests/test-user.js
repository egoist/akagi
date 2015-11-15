import test from 'ava'
import Akagi from './akagi'

test('user signup', async t => {
  const userdata = {
    username: Date.now().toString(),
    email: 'i@0x.meeq',
    password: '122345'
  }
  try {
    const result = await Akagi.User.signUp(userdata)
    t.ok(result && result.email)
  } catch(err) {
    t.fail(err.messages.join('\n'))
  }
})
