import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";
import { useRouter } from "next/navigation";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.id;
    const userPosts = await Prompt.find({ creator: userId }).populate(
      "creator"
    );
    return new Response(JSON.stringify(userPosts));
  } catch (err) {
    console.log(err);
  }
};
