exports.port = process.env.PORT || 8080
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`

exports.db_port = process.env.DB_PORT || 8081
