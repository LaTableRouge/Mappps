export const delay = (n) => {
  n = n || 2000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}
