const BasePublication = {
  description: {
    type: String,
    trim: true
  },

  status: {
    type: String,
    default: true
  },

  createAt: {
    type: Date,
    default: Date.now
  }
}

export default BasePublication
