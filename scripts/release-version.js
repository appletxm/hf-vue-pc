const fs = require('fs')
const path = require('path')

function getVerionNo(versionNo) {
  if (versionNo) {
    return versionNo
  }
  const pkgFileObj = JSON.parse(fs.readFileSync(path.resolve('./package.json')))
  const { version } = pkgFileObj
  console.info(version)
  const numbs = version.split('.')
  console.info(numbs)
  numbs[2] = Number(numbs[2]) + 1
  return numbs.join('.')
}

module.exports = {
  getVerionNo
}