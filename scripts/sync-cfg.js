const fs = require('fs')
const path = require('path')

function syncCfgFile() {
  const envKey = process.argv[2] || 'production'
  const envCfg = require(`../config/env-${envKey}`)
  const { outputCfg } = envCfg
  const text = `window.appInfo = ` + JSON.stringify(outputCfg)

  fs.writeFileSync(path.resolve('./cfg.js'), text, 'utf8')
}

syncCfgFile()
