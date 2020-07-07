module.exports = (folders, fs) => {
  for (const folder of folders) {
    fs.mkdirSync(folder)
  }
}
