import mongoose from "mongoose";
const PromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    unique: [true, "prompt already exists !"],
    required: [true, "prompt is required!"],
  },
  tags: {
    type: mongoose.Schema.Types.Array,
    required: [true, "tag is required!"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
