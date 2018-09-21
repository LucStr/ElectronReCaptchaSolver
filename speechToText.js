module.exports = {
    getTextByUrl
}

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const download = require('download');
const config = require('./config.json');

var speechToText = new SpeechToTextV1({
    username: config.username,
    password: config.password,
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});

function getTextByUrl(url) {
    var audioPath = __dirname + '/temp/audio_' + new Date().valueOf() + '.mp3';
    return new Promise((resolve, reject) => {
        download(url).then(data => {
            fs.writeFileSync(audioPath, data);
        }).then(() => {
            recognize(audioPath, 'audio/mpeg')
                .then(e => resolve(e))
                .catch(e => reject(e));
            fs.unlink(audioPath);
        });
    });
}

function recognize(audio, content_type) {
    var params = {
        audio: fs.createReadStream(audio),
        content_type: content_type
    };

    return new Promise((resolve, reject) => {
        speechToText.recognize(params, function (err, res) {
            if (err)
                reject(err);
            else
                resolve(res.results[0].alternatives[0].transcript);
        });
    });
}