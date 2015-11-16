export default function(err) {
  const messages = []
  for (const i in err.errors) {
    if (err.errors[i].message) {
      messages.push(err.errors[i].message)
    }
  }
  return {
    error: err.message,
    messages,
  }
}
