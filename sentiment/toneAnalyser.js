
const analyzeTone = (text) => {

    const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
    const secrets = require("../config/keys").toneAnalyzer;
    const toneAnalyzer = new ToneAnalyzerV3({
        version: '2017-09-21',
        iam_apikey: secrets.key,
        url: secrets.url
    });
    var toneParams = {
        tone_input: { 'text': text },
        content_type: 'application/json'
    };

    toneAnalyzer.tone(toneParams, (error, toneAnalysis) => {
        if (error) {
        throw new Error(error)
    } else { 
        return JSON.stringify(toneAnalysis, null, 2)
    }
    });

}

module.exports = analyzeTone;
