import mongoose from 'mongoose'

const PublicationContent = mongoose.Schema({

  path: {
    type: String,
    trim: true,
    require: true
  },

  publication: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Publication'
  }

})

export default mongoose.model('Publication_content', PublicationContent)
