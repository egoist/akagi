import test from 'ava'
import Akagi from './akagi'

const user_cache = {
  username: Date.now().toString(),
  password: '123456'
}
let member

test('node create', async t => {
  const userdata = {
    username: user_cache.username,
    email: `i@${Date.now()}.com`,
    password: user_cache.password
  }
  member = await Akagi.User.signUp(userdata)
  const nodeData = {
    name: Date.now().toString(),
    slug: Math.random().toString(36).substring(7),
    moderators: [
      member._id
    ]
  }
  try {
    const node = await Akagi.Node.create(nodeData)
    t.pass(node && node.name)
  } catch(err) {
    t.fail(err.messages.join('\n'))
  }
})
