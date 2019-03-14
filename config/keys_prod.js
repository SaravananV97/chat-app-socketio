module.exports = {
    mongodbURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    toneAnalyzer: {
        Url: process.env.TONE_URI,
        key: process.env.TONE_KEY
    }
}

