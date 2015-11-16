import test from 'ava'
import Akagi from './_akagi'
import { NodeModel } from './_models'

const user_cache = {
  username: Date.now().toString(),
  password: '123456'
}
let member
test.before('user signup', async t => {
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
test.after('clean', t => {
  NodeModel.remove({}, err => {
    t.end()
  })
})

test.serial('node create', async t => {
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
