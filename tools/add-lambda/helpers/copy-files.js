module.exports = (files, fs) => {
  for (const file of files) {
    fs.copyFileSync(file.src, file.dest)
  }
}
