const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = Schema.Types

const SubSchema = new Schema({
  userId: {type: ObjectId, required: true, index: 1},
  url: {type: String, required: true}
})

const SubModel = mongoose.model('Sub', SubSchema)

console.log('ObjectId')
console.log(ObjectId)
async function insert(sub) {
  return await SubModel.create(sub)
}

async function getOneByUserId(userId) {
  return await SubModel.find({userId})
}

async function list(params) {
  const match = {}
  const flow = SubModel.find(match)
  return await flow.exec()
}

module.exports = {insert, getOneByUserId, list}
