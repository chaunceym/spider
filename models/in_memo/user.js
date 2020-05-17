const users = []
class User {
  constructor(firstName,lastName,age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
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

  static list(query){
    return User.users
  }

  static get ['users'](){
    return users
  }
}

module.exports = User


