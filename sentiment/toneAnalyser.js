const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const secrets = require("../config/keys").toneAnalyzer;

const tones = {

    sadness: "(⌣́_⌣̀) ",
    anger: "(ง'̀-'́)ง",
    fear: "(❛⁾︵❛⁾)",
    analytical: "(-ˇ⊿ˇ-)",
    tentative: "(#◕︷◕,)",
    confident: "(˘ˑ˘)",
    joy: "≧◡≦"
}

const analyzeTone = (text) => {

    const toneAnalyzer = new ToneAnalyzerV3({
        version: '2017-09-21',
        iam_apikey: secrets.key,
        url: secrets.Url
    });
    var toneParams = {
        tone_input: { 'text': text },
        content_type: 'application/json'
    };

    return new Promise((resolve, reject) => {
        
        if(text === null || text === undefined || text === "")
            resolve("");

        toneAnalyzer.tone(toneParams, (error, toneAnalysis) => {
            if (error) {
                reject(error);
        } else { 

            let tonesArr = toneAnalysis.document_tone.tones
            let n = tonesArr.length;
            if(n === 0) resolve("");
            else{
                max_tone = "joy"
                max_prob = 0; 
                for(let i = 0; i < n; i++){
                    if(tonesArr[i].score > max_prob){
                        max_prob = tonesArr[i].score;
                        max_tone = tonesArr[i].tone_id;
                    } 
                }
                resolve(tones[max_tone]);
            }
        }
        });
    })

};

module.exports = {analyzeTone};
