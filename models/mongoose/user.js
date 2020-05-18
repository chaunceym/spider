const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {type: String, required: true, index: 1},
  age: {type: Number, min: 0, max: 120},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
})

const UserModel = mongoose.model('user', UserSchema)

function insert() {
  return UserModel.create(user)
}

function getOneById() {
  return UserModel.findOne({_id: id})
}

function getOneByName(firstName, lastName) {
  return UserModel.findOne({firstName, lastName})
}

function list(params) {
  const match = {}
  const flow = UserModel.find(match)
  return flow.exec()
}

module.exports = {insert, getOneById, getOneByName, list}
