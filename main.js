const { app, BrowserWindow } = require('electron');
const path = require('path');
const expressApp = require('./server/server'); // Import the Express app from server.js

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Load the React app

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    if (mainWindow === null) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Ensure the server starts when Electron app is ready
expressApp.listen(5000, () => {
  console.log('Express server is running on port 5000');
});
