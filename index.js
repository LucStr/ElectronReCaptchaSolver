const electron = require('electron');
const path = require('path');
const url = require('url');


const { app, BrowserWindow, session } = electron;

var mainWindow;

app.on('ready', () => {
    initMainWindow();
    removeToolBar();
    mainWindow.maximize();
    mainWindow.toggleDevTools();
    loadReCaptchaTestSite();
    clearCookies();
    var filter = {
        urls: ["https://www.google.com/recaptcha/api2/payload?*"]
    }
    session.defaultSession.webRequest.onCompleted(filter, (details) => {
        if(details.resourceType == "image"){
            switchToAudio();
        } else {
            solveAudioChallenge();
            //mainWindow.webContents.executeJavaScript('alert("PETER")')
        }
        console.log(JSON.stringify(details));
    });
});

function switchToAudio(){
    setTimeout(() => {
        mainWindow.webContents.executeJavaScript(`clickAudioButton();`);
    }, 2315)
}

function initMainWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            webSecurity: false
        }
    });
}

function loadReCaptchaTestSite() {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes: true,
    }));
}

function clearCookies() {
    //mainWindow.webContents.session.clearAuthCache();
    mainWindow.webContents.session.clearCache(() => {});
    mainWindow.webContents.session.clearHostResolverCache();
    mainWindow.webContents.session.clearStorageData({storages: "appcache, cookies, filesystem, indexdb, localstorage, shadercache, websql, serviceworkers"});
}

function removeToolBar() {
    mainWindow.setMenu(null);
}


