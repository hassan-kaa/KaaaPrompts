import Prompt from "@models/prompt.js";
export const GET = async (req, res) => {
  try {
    const prompts = await Prompt.find();
    console.log(prompts);
    return new Response(JSON.stringify({ prompts }));
  } catch (err) {
    console.log(err);
  }
};
