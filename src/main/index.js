'use strict'

// import { ipcMain } from 'electron'
import preferences from '../renderer/preferences'
const electron = require('electron')
// const { globalShortcut, Menu, clipboard } = require('electron')
const { globalShortcut, Menu } = require('electron')
var menubar = require('menubar')
// var robot = require('robotjs')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const showOnRightClick = false
let options = {
  tooltip: 'gitmoji menubar',
  index: winURL,
  preloadWindow: true,
  showOnRightClick: showOnRightClick,
  resizable: process.env.NODE_ENV === 'development'
}
if (process.env.NODE_ENV === 'development') {
  options.width = 320
  options.height = 500
}
var mb = menubar(options)

mb.on('ready', function ready () {
  console.log('app is ready')
  registerGlobalShortcut(preferences.getGlobalShortcut())
  mb.app.on('hide-gitmoji-window', () => {
    // clipboard.readText()
    mb.hideWindow()
    // robot.typeString('clipboard.readText()')
  })
  mb.app.on('global-shortcut-updated', (e) => {
    registerGlobalShortcut(e)
  })
  // ipcMain.on('hide-gitmoji-window', (event, arg) => { mb.hideWindow() })
  mb.app.on('will-quit', function () {
    globalShortcut.unregisterAll()
  })

  var trayMenuTemplate = [
    {
      label: 'Preferences'
    },
    {
      type: 'separator'
    },
    {
      label: 'Feedback',
      click: function () {
        // TODO: update the url
        electron.shell.openExternal('https://github.com')
      }
    },
    {
      label: 'About',
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      role: 'quit'
    }
  ]
  var trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
  if (showOnRightClick) {
    mb.tray.setContextMenu(trayMenu)
  } else {
    mb.tray.on('right-click', (event, bounds) => {
      mb.tray.popUpContextMenu(trayMenu)
    })
  }
  mb.app.setAboutPanelOptions({
    applicationName: 'gitmoji menubar',
    applicationVersion: '0.1'
  })
})

mb.on('after-hide', () => {
  mb.app.hide()
  mb.setOption('x', undefined)
  mb.setOption('y', undefined)
})

function registerGlobalShortcut (shortcut) {
  globalShortcut.unregisterAll()
  let accelerator = []
  if (shortcut.shift) {
    accelerator.push('Shift')
  }
  if (shortcut.alt) {
    accelerator.push('Alt')
  }
  if (shortcut.ctrl) {
    accelerator.push('Ctrl')
  }
  if (shortcut.meta) {
    accelerator.push('Super')
  }
  if (shortcut.char) {
    accelerator.push(shortcut.char.toUpperCase())
  }
  if (accelerator.length < 1) {
    return
  }
  globalShortcut.register(accelerator.join('+'), () => {
    let cursor = electron.screen.getCursorScreenPoint()
    if (Number.isInteger(cursor.x) && Number.isInteger(cursor.y)) {
      mb.setOption('x', cursor.x)
      mb.setOption('y', cursor.y)
    }
    mb.showWindow()
  })
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
