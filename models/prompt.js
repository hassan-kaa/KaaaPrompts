import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: String,
    unique: [true, "prompt already exists !"],
    required: [true, "prompt is required!"],
  },
  tags: {
    type: Schema.Types.Array,
    required: [true, "tag is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
