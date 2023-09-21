import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  try {
    console.log({ prompt, tag, userId });
    const newPrompt = await new Prompt({ prompt, tag, creator: userId });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(req);
    console.log(error);
  }
};
