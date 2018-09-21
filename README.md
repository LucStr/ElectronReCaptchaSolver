# Electron ReCaptcha Solver
This Electron Application solves Recaptchas in an Electron Application. [Demo](https://www.youtube.com/watch?v=tkxf__-ijk4)

## Getting Started
1. ``` git clone "https://github.com/LucStr/ElectronReCaptchaSolver.git" ```
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

## Technical Overview
The Application monitors the Traffic going through the Application. It has a filter in place, that will detect, when a captcha is required. After it loads it will execute Javascript on the page, that will do all of the navigation: 
### Press Checkbox
``` document.querySelector('[role="presentation"]').contentWindow.document.getElementById("recaptcha-anchor").click() ```
### Switch to Audio
The switch to audio is a little more complex, as there is a check, whether a mouse has actually hoverd over the recaptcha audio button or not. To simulate that, a mouseover and ouseenter event are dispatched on the element:
``` 
var button = window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button");
button.dispatchEvent(new MouseEvent('mouseover'));
button.dispatchEvent(new MouseEvent('mouseenter'));
button.click();   
```
### Solve Audio Challenge
After it got the response from the Watson API it will fill the textbox with the answer with the solution:
```
document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById('audio-response').value = "${solution}"
```
### Press Verify
To finish up the Captcha the verify button is pressed: 
```
window.document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-verify-button").click();
```


## Built With

* [Electron](https://electronjs.org/) - The Framework used
* [WatsonAPI](https://www.ibm.com/watson/services/speech-to-text/) - The API used for speecht to text

## Acknowledgments

* Inspired by [outCaptcha](https://github.com/theriley106/outCaptcha)
