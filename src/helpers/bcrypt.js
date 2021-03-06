import bcrypt from 'bcrypt'

export function genSalt(length = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(length, (err, salt) => {
      if (err) {
        reject(err)
      }
      resolve(salt)
    })
  })
}

export function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function hashCallback(err, hash) {
      if (err) {
        reject(err)
      }
      resolve(hash)
    })
  })
}

export function comparePassword(hash, yours) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(yours, hash, function compareCallback(err, res) {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
