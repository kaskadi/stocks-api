module.exports = baseRes => data => {
  console.log(data)
  return {
    ...baseRes,
    body: JSON.stringify({ message: 'Stock update successfully requested!' })
  }
}
