import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
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
    trim: true,
    maxLength: 25,
    minLength: 6
  },

  location: {
    type: String,
    trim: true,
    maxLength: 30
  },

  birthDate: {
    type: Date,
    min: new Date(1900, 0, 1).getTime(),
    max: Date.now(),
    validate: {
      validator: function (v) {
        // La fecha debe ser mayor o igual al 1 de enero de 1900
        // y menor o igual a la fecha actual
        const minDate = new Date(1900, 0, 1).getTime()
        const maxDate = Date.now()
        return v && v.getTime() >= minDate && v.getTime() <= maxDate
      },
      message: props => `${props.value} no es una fecha valida.`
    }
  },

  createAt: {
    type: Date,
    default: Date.now()
  }

})

export default mongoose.model('User', UserSchema)
