require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const fileDir =  path.join(__dirname, 'files')

const credentials = new AWS.SharedIniFileCredentials({
    profile: process.env.AWS_CREDENTIALS_PROFILE
})

AWS.config.credentials = credentials

AWS.config.getCredentials(err => {
    if (err) {
        return console.log(err.stack)
    }

    console.log('Access key: ', AWS.config.credentials.accessKeyId)

    const s3 = new AWS.S3()
    const files = fs.readdirSync(fileDir)

    files.forEach(filename => {
        let filepath = path.join(fileDir, filename)
        let file = fs.readFileSync(filepath)

        let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Body: file
        }

        s3.upload(params, (err, data) => {
            if (err) {
                return console.log(err)
            }

            console.log(`File uploaded to ${data.Location}`)
        })
    })
})