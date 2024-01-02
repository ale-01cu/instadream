import mongoose from 'mongoose'

const FollowSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }

})

export default mongoose.model('Follow', FollowSchema)
