import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
  userId:{
    type:String,
    required: true
  },
  desc :{
    type:String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cover: {
    type: String, 
    required: true//image url
  },
  images: {
    type: [String], 
    required: true//image url
  },
  shortTitle: {
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: Number,
    required: true
  },
  sales:{
    type: Number,
    default: 0
  }
},{
    timestamps: true
});

export default mongoose.model("User", GigSchema);