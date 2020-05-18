const users = []
class User {
  constructor(firstName,lastName,age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this._id = User.id ++
  }

  getName(){
    return `${this.firstName} ${this.lastName}`
  }

  static insert(firstName,lastName,age){
    const u = new User(...arguments)
    User.users.push(u)
    return u
  }

  static getOneByName(firstName,lastName){
    return User.users.find(u => firstName === u.firstName && lastName === u.lastName)
  }

  static getOneById(userId){
    return User.users.find(u => userId === u._id )
  }

  static list(query){
    return User.users
  }

  static get ['users'](){
    return users
  }
}

User.id = 0
module.exports = User


