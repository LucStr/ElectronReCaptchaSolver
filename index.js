const electron = require('electron');
const path = require('path');
const url = require('url');
const speechToText = require('./speechToText')


const { app, BrowserWindow, session } = electron;

var mainWindow;

app.on('ready', () => {
    initMainWindow();
    removeToolBar();
    loadReCaptchaTestSite();
    session.defaultSession.webRequest.onCompleted({ urls: ["https://www.google.com/recaptcha/api2/payload?*", "https://www.google.com/recaptcha/api2/bframe?*"] }, (details) => {
        if(details.url.includes('https://www.google.com/recaptcha/api2/bframe?')){
            pressCheckBox();
            return;
        }
        if (details.resourceType == "image") {
            switchToAudio();
        } else {
            solveAudioChallenge(details.url).then(e => {
                pressVerify();
            });
        }
    });
});

function pressCheckBox(){
    mainWindow.webContents.executeJavaScript(`document.querySelector('[role="presentation"]').contentWindow.document.getElementById("recaptcha-anchor").click()`);
}

function switchToAudio() {
    mainWindow.webContents.executeJavaScript(`
    window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button").dispatchEvent(new MouseEvent('mouseover'));
    window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button").dispatchEvent(new MouseEvent('mouseenter'));
    window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button").click();`)
}

function pressVerify() {
    mainWindow.webContents.executeJavaScript(`window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-verify-button").click();`);
}

function solveAudioChallenge(url) {
    return speechToText.getTextByUrl(url).then(e => {
        mainWindow.webContents.executeJavaScript(`document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById('audio-response').value = "${e}"`);
    })
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

function removeToolBar() {
    mainWindow.setMenu(null);
}


