const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 400, height: 600, maximizable:true})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   win.webContents.openDevTools()
}

app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
    window.setResizable(false);
});

app.on('ready', createWindow)