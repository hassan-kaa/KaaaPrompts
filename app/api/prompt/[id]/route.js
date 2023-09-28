import Prompt from "@models/prompt.js";
import { connectToDB } from "@utils/database";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const id = params.id;
    const post = await Prompt.findById(id);
    if (post) return new Response(JSON.stringify(post), { status: 200 });
    else return new Response("Prompt does not exist !", { status: 404 });
  } catch (err) {
    return new Response("server Error ", { status: 500 });
  }
};
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const newPrompt = await req.json();
    const id = params.id;
    const post = await Prompt.findById(id);
    post.prompt = newPrompt.prompt;
    post.tags = newPrompt.tags;
    post.save();
    if (post) return new Response(JSON.stringify(post), { status: 201 });
    else return new Response("Prompt does not exist !", { status: 404 });
  } catch (err) {
    return new Response("server Error ", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const id = params.id;
    const post = await Prompt.findByIdAndDelete(id);
    if (post)
      return new Response("Prompt Deleted successfully !", { status: 200 });
    else return new Response("Prompt does not exist !", { status: 404 });
  } catch (err) {
    return new Response("server Error ", { status: 500 });
  }
};
