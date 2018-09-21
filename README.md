# ElectronReCaptchaSolver
This Electron Application solves Recaptchas in an Electron Application.

## Getting Started
1. ```git clone "https://github.com/LucStr/ElectronReCaptchaSolver.git" ```
2. The Captcha Solver uses an The Watson API provided by IBM. To get started you will have to get a free package of their Speech-To-Text Cloud Programm: https://www.ibm.com/watson/services/speech-to-text/
3. After you get your API username and password fill them into the config.json file.
4. Install all the required modules: 
```
npm install
```
5. Now everything is setup. You can start the Application by running
```
npm start
```

## Built With

* [Electron](https://electronjs.org/) - The Framework used
* [WatsonAPI](https://www.ibm.com/watson/services/speech-to-text/) - The API used for speecht to text

## Acknowledgments

* Inspired by [outCaptcha](https://github.com/theriley106/outCaptcha)
