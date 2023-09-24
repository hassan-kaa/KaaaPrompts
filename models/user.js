import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already exists !"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "username is required!"],
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
