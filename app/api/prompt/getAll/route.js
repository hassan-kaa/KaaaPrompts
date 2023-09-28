import Prompt from "@models/prompt.js";
import { connectToDB } from "@utils/database";
export const GET = async (req, res) => {
  // const { userId } = await req.json();
  try {
    await connectToDB();
    const prompts = await Prompt.find().populate("creator");
    console.log(prompts);
    return new Response(JSON.stringify({ prompts }));
  } catch (err) {
    console.log(err);
  }
};
