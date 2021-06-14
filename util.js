const fs = require('fs')
const path = require('path')
const logPath = path.join(__dirname, 'logs')
const { format } = require('date-fns')

module.exports = {
    writeLog(msg) {
        let logFile = format(new Date(), 'yyyy-MM-dd')
        let time = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

        fs.appendFileSync(path.join(logPath, logFile), `[${time}] ${msg}\n`)
    }
}