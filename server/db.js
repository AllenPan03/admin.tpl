const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  pwd: String
})

const articleSchema = new Schema({
  content: String,
  title: String,
  date: Date,
  uname: String,
  level: String,
  mobile: String,
  creditmoney: String
})

const whiteSchema = new Schema({
  uname: String,
  level: String,
  mobile: String,
  creditmoney: String
})

const testSchema = new Schema({
  uname: String,
  level: String,
  mobile: String,
  creditmoney: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  White: mongoose.model('White', whiteSchema),
  Test: mongoose.model('Test', testSchema),
  initialized: false
}

const initialize = function () {
  Models.User.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      console.log('Database opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    } else {
      Models.initialized = true
    }
  })
}

mongoose.connect('mongodb://localhost/CMS')
// mongoose.set('debug', true)

const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models
