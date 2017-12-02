'use strict'

// import { ipcMain } from 'electron'
import preferences from '../renderer/preferences'
const electron = require('electron')
const { globalShortcut, Menu } = require('electron')
var path = require('path')
var menubar = require('menubar')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const showOnRightClick = false
let iconRelativePath = `../../${process.env.NODE_ENV === 'production' ? 'dist/electron/' : ''}static/IconTemplate.png`
let options = {
  icon: path.join(__dirname, iconRelativePath),
  tooltip: 'Gitmoji Menubar',
  index: winURL,
  preloadWindow: true,
  showOnRightClick: showOnRightClick,
  width: 320,
  height: 500,
  resizable: process.env.NODE_ENV === 'development'
}

var mb = menubar(options)
mb.app.setAboutPanelOptions({
  credits: 'Icon designed by Smashicons from Flaticon',
  copyright: `Copyright © ${new Date().getFullYear()} Shaoan Zhang. All rights reserved`
})
mb.on('ready', function ready () {
  console.log('app is ready')
  registerGlobalShortcut(preferences.getGlobalShortcut())
  mb.app.on('hide-gitmoji-window', () => {
    mb.hideWindow()
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
      mb.hideWindow()
      mb.tray.popUpContextMenu(trayMenu)
    })
  }
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
