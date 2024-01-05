import mongoose from 'mongoose'
import BasePublication from './baseModel.js'

const Publication = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  ...BasePublication
})

export default mongoose.model('Publication', Publication)
