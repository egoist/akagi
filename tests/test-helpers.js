import test from 'ava'
import * as object from '../lib/helpers/object'

test('object hasEssentialKeys', t => {
  const has = object.hasEssentialKeys({a:1}, ['b'])
  t.notOk(has)
  t.end()
})

test('object trusty', t => {
  const trusty = object.everyTrusty({a: 1, b: ''})
  t.notOk(trusty)
  t.end()
})
