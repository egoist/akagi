export function everyTrusty(obj) {
  for (const key in obj) {
    if (!obj[key]) {
      return false
    }
  }
  return true
}

export function hasEssentialKeys(obj, keys = []) {
  let has = true
  if (keys && keys.length > 0) {
    keys.forEach(k => {
      if (!obj[k]) {
        has = false
        return
      }
    })
  }
  return has
}
