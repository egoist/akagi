export default function (err) {
  const messages = []
  for(const i in err.errors) {
    messages.push(err.errors[i].message)
  }
  return {
    error: err.message,
    messages
  }
}
