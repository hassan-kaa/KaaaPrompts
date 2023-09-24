import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
  const { prompt, tags, userId } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({ prompt, tags, creator: userId });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
