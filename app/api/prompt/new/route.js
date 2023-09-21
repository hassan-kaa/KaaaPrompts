import {connectToDB} from "@utils/database"
import Prompt from "@models/prompt";
export const POST = async (req,res)=>{
const {prompt, tag, userId} = req.json();
try{
await connectToDB()
const newPrompt = new Prompt({prompt,tag,creator : userId})
await newPrompt.save()
return new Response(JSON.stringify(newPrompt),{status:201})
}catch(error){

}

}