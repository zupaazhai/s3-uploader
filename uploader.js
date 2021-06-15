require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const util = require('./util')

const fileDir =  path.join(__dirname, 'files')

const credentials = new AWS.SharedIniFileCredentials({
    profile: process.env.AWS_CREDENTIALS_PROFILE
})

const ignoreFiles = [
    '.gitignore'
]

AWS.config.credentials = credentials
const s3 = new AWS.S3()

function upload(filename, filepath, params) {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                return reject(err)
            }

            let logMsg = `${filename} uploaded to ${data.Location}`
            console.log(logMsg)

            if (data.Location) {
                fs.unlink(filepath, err => {
                    if (err) {
                        return console.log(err)
                    }

                    console.log(`${filename} deleted`)
                })
            }

            util.writeLog(logMsg)
            resolve(params)
        })
    })
}

AWS.config.getCredentials(err => {
    if (err) {
        return console.log(err.stack)
    }

    console.log('Access key: ', AWS.config.credentials.accessKeyId)

    fs.readdir(fileDir, async (err, files) => {

        for (let index = 0; index < files.length; index++) {

            if (ignoreFiles.includes(files[index])) {
                continue;
            }

            let filename = files[index]
            let filepath = path.join(fileDir, filename)
            let file = fs.readFileSync(filepath)

            let params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: file
            }

            await upload(filename, filepath, params)
        }
    })
})