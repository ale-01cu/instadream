import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  username: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },

  avatar: {
    type: String,
    trim: true
  },

  webSite: {
    type: String,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  password: {
    type: String,
    require: true,
    trim: true
  },

  createAt: {
    type: Date,
    default: Date.now()
  }

})

export default mongoose.model('User', UserSchema)
