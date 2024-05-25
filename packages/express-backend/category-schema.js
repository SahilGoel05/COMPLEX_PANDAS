import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserAuth' // Assuming you have a User model
    }
    
  },
 
{ timestamps: true });

const Category = mongoose.model("Category", CategorySchema);

export default Category;