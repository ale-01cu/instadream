import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  status: {
    type: Boolean,
    default: true
  },

  name: {
    type: String,
    trim: true,
    require: true,
    maxLength: 50,
    minLength: 3
  },

  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    maxLength: 20,
    minLength: 3
  },

  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    maxLength: 60,
    minLength: 11
  },

  avatar: {
    type: String,
    trim: true
  },

  webSite: {
    type: String,
    trim: true,
    maxLength: 100
  },

  description: {
    type: String,
    trim: true,
    maxLength: 160
  },

  password: {
    type: String,
    require: true,
    trim: true
  },

  location: {
    type: String,
    trim: true,
    maxLength: 30
  },

  birthDate: {
    type: Date,
    min: new Date(1900, 0, 1).getTime(),
    max: Date.now()
  },

  createAt: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.model('User', UserSchema)
