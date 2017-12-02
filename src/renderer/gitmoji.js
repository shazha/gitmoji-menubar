const fs = require('fs')
const path = require('path')
const pathExists = require('path-exists')

const gitmojiBaseUrl = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master'

class Gitmoji {
  constructor (apiClient) {
    this._apiClient = apiClient
  }

  list () {
    return this._fetchEmojis()
      .then(gitmojis => this._parseGitmojis(gitmojis))
      .catch(err => {
        // TODO
        console.log(err)
      })
  }

  _parseGitmojis (gitmojis) {
    return gitmojis.map(gitmoji => {
      return {
        emoji: gitmoji.emoji,
        name: gitmoji.name,
        code: gitmoji.code,
        description: gitmoji.description
      }
    })
  }

  _fetchEmojis () {
    const cachePath = this._getCachePath()
    if (this._isCacheAvailable(cachePath)) {
      return this._loadCachedEmojis(cachePath)
    }
    return this._fetchRemoteEmojis().then(emojis => {
      this._createCache(cachePath, emojis)
      return emojis
    })
  }

  _fetchRemoteEmojis () {
    return this._apiClient.get(`${gitmojiBaseUrl}/src/data/gitmojis.json`)
      .then(res => {
        return res.data.gitmojis
      })
      .catch(err => {
        // TODO
        console.log(err)
      })
  }

  _loadCachedEmojis (cachePath) {
    return Promise.resolve(JSON.parse(fs.readFileSync(cachePath)))
  }

  _getCachePath () {
    const home = process.env.HOME || process.env.USERPROFILE
    return path.join(home, '.gitmoji-menubar', 'gitmojis.json')
  }

  _isCacheAvailable (cachePath) {
    return pathExists.sync(cachePath)
  }

  _createCache (cachePath, emojis) {
    const cacheDir = path.dirname(cachePath)
    if (emojis !== undefined) {
      if (!pathExists.sync(cacheDir)) {
        fs.mkdirSync(cacheDir)
      }
      fs.writeFileSync(cachePath, JSON.stringify(emojis))
    }
  }
}

// module.exports = Gitmoji
export default Gitmoji
