const AWS = require('aws-sdk')
const fs = require('fs')

const credentials = new AWS.SharedIniFileCredentials({
    profile: 's3backup'
})

AWS.config.credentials = credentials
AWS.config.getCredentials(err => {
    if (err) {
        return console.log(err.stack)
    }

    console.log('Access key: ', AWS.config.credentials.accessKeyId)

    const s3 = new AWS.S3()
    const file = fs.readFileSync('backup.txt')

    const params = {
        Bucket: 'kumuangproperties',
        Key: 'backup.txt',
        Body: file
    }

    s3.upload(params, (err, data) => {
        if (err) {
            return console.log(err)
        }

        console.log(`File uploaded to ${data.Location}`)
    })
})