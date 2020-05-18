const mongoose = require('mongoose')

mongoose.Promise = Promise

const url = `mongodb://localhost:27017/spider`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection

db.on('open', () => {
  console.log('db connected')
})
db.on('error', (e) => {
  console.log(e)
})

module.exports = db
