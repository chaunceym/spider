const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HttpRequestParamError = require('./../../errors/http_request_param_error')
const pbkdf2Async = require('util').promisify(require('crypto').pbkdf2)
const passwordConfig = require('./../../cipher/password_config')


const UserSchema = new Schema({
  name: {type: String, required: true, index: 1},
  age: {type: Number, min: 0, max: 120},
  username: {type: String, required: true, unique: true},
  password: {type: String},
})

const UserModel = mongoose.model('users', UserSchema)

async function insert(user) {
  return await UserModel.create(user)
}

async function getOneById(id) {
  return await UserModel.findOne({_id: id})
}

async function getOneByName(name) {
  return await UserModel.findOne({name})
}

async function list(params) {
  const match = {}
  const flow = UserModel.find(match)
  return await flow.exec()
}

async function createUserByNamePass(user) {
  const nameDupUser = await UserModel.findOne({
    $or: [{
      username: user.username
    }, {
      name: user.name
    }]
  }, {_id: 1})
  if (nameDupUser) {
    throw new HttpRequestParamError('username', '这个用户名或昵称已被占用', `duplicate username: ${user.username}`)
  }

  const passToSave = await pbkdf2Async(user.password, passwordConfig.SALT, passwordConfig.ITERATIONS, passwordConfig.KEY_LENGTH, passwordConfig.DIGEST)

  const created = await insert({
    username: user.username,
    password: passToSave,
    name: user.name
  })
  return {
    _id: created._id,
    username: created.username,
    name: created.name
  }
}

async function getUserByNamePass(username, password) {
  const passToFind = await pbkdf2Async(password, passwordConfig.SALT, passwordConfig.ITERATIONS, passwordConfig.DIGEST)
  return await UserModel.findOne({
    username,
    password: passToFind
  }, {
    password: 0
  })
}


module.exports = {getUserByNamePass, createUserByNamePass, insert, getOneById, getOneByName, list}
