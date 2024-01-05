const BasePublication = {
  description: {
    type: String,
    trim: true,
    maxLength: 160
  },

  status: {
    type: String,
    default: true
  },

  createAt: {
    type: Date,
    default: Date.now()
  }
}

export default BasePublication
