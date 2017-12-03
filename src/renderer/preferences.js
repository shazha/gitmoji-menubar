const AutoLaunch = require('auto-launch')
const nconf = require('nconf')
const path = require('path')

const globalShortcutConfigKey = 'shortcuts:main'

class Preferences {
  constructor () {
    this._launcher = new AutoLaunch({name: 'gitmoji-menubar', isHidden: true})
    this._confFile = path.join(process.env.HOME || process.env.USERPROFILE, '.gitmoji-menubar', 'gitmoji-menubar-config.json')
    nconf.file(this._confFile)
      .defaults({
        shortcuts: {
          main: {
            shift: true,
            alt: false,
            ctrl: true,
            meta: false,
            char: '/'
          }
        }
      })
  }
  setLaunchAtLogin (enable) {
    return this.isLaunchAtLoginEnabled()
      .then(enabled => {
        if (enabled === !!enable) {
          return
        }
        if (enable) {
          return this._launcher.enable()
        } else {
          return this._launcher.disable()
        }
      })
      .then(() => {
        return true
      })
      .catch(err => {
        console.error(err)
        return false
      })
  }

  isLaunchAtLoginEnabled () {
    return this._launcher.isEnabled()
  }

  getGlobalShortcut () {
    nconf.load()
    return nconf.get(globalShortcutConfigKey)
  }

  setGlobalShortcut (val) {
    nconf.set(globalShortcutConfigKey, val)
    return new Promise((resolve, reject) => {
      nconf.save(function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}

export default new Preferences()
