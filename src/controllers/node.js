import Node from '../models/node'
import { hasEssentialKeys } from '../helpers/object'
import mongoErrors from '../helpers/mongo-errors'

export function create(nodeData) {
  return new Promise(async (resolve, reject) => {
    if (!hasEssentialKeys(nodeData, ['name', 'moderators', 'slug'])) {
      return reject({ error: 'Node info error', messages: ['Node info not complete'] })
    }
    const node = new Node({ ...nodeData })
    try {
      resolve(await Node.create(node))
    } catch (err) {
      reject(mongoErrors(err))
    }
  })
}
