const mongoose = require('mongoose')
const config = require('./config')

const connection = {
        host: 'localhost',
        port: config.db_port,
        database: 'motigram_db',
}


const url = `mongodb://${connection.host}:${connection.port}/${connection.database}`


mongoose.connect(url)
const db = mongoose.connection

module.exports = {
        db
}

