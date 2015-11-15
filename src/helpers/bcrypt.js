import bcrypt from 'bcrypt'
import pify from 'pify'

export function genSalt (length = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        reject(err)
      resolve(salt)
    })
  })
}

export function hashPassword (password, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err)
        reject(err)
      resolve(hash)
    })
  })
}

export function comparePassword (hash, yours) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(yours, hash, function(err, res) {
      if (err)
        reject(err)
      resolve(res)
    })
  })
}
