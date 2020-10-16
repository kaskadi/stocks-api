module.exports = baseRes => err => {
  console.log(err)
  return {
    ...baseRes,
    statusCode: 500,
    body: JSON.stringify({ message: 'An error occured while requesting stock update...' })
  }
}
