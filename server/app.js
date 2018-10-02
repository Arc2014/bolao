// Electron configs
const electron = require('electron');
const {app: app, BrowserWindow} = electron;
const {ipcMain} = electron;

//var db  = require('./db/db.js');

//DAOS
const sorteioDao = require('./dao/sorteio-dao.js');
const cartelaDao = require('./dao/cartela-dao.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1024, height: 768});

    // and load the index.html of the main.
    mainWindow.loadFile('client/index.html');

    // Open the DevTools.
     mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your main supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after thi;s event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the main when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

//CARTELA CRUD ---------------------------------
ipcMain.on('cartela-save', (event, cartela) => {
    cartelaDao.save(cartela).then(cartela => {
        event.returnValue = cartela;
    });
});

ipcMain.on('cartela-find-all', (event) => {
    cartelaDao.findAll().then(cartelas => {
        event.returnValue = cartelas;
    });
});

ipcMain.on('cartela-find-by-id', (event, idCartela) => {
    cartelaDao.findById(idCartela).then(cartelas => {
        event.returnValue = cartelas;
    });
});


ipcMain.on('cartela-update', (event, cartela) => {
    cartelaDao.update(cartela).then(cartela => {
        event.returnValue = cartela;
    });
});

ipcMain.on('cartela-remove', (event, idCartela) => {
    cartelaDao.remove(idCartela).then(() => {
        event.returnValue = {};
    });
});

//SORTEIO CRUD ---------------------------------
ipcMain.on('sorteio-save', (event, sorteio) => {
    sorteioDao.save(sorteio).then(sorteio => {
        event.returnValue = sorteio;
    });
});

ipcMain.on('sorteio-find-all', (event) => {
    sorteioDao.findAll().then(sorteios => {
        event.returnValue = sorteios;
    });
});

ipcMain.on('sorteio-update', (event, sorteio) => {
    sorteioDao.update(sorteio).then(sorteio => {
        event.returnValue = sorteio;
    });
});

ipcMain.on('sorteio-remove', (event, idSorteio) => {
    sorteioDao.remove(idSorteio).then(() => {
        event.returnValue = {};
    });
});