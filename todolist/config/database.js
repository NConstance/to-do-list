const mongosse = require("mongoose")
mongosse.connect(process.env.MONGO_URI)

const db = mongosse.connection;

db.on('connection', () => {
    console.log(`connected to db: ${db.name} @ ${db.host}`)
})