import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });
const basePromptPrefix = 
'Generate a sublease post. Make it formal. Fill out the information using inputs in the last sentence. Example content is like this If you are interested in this sublet, please reach out to me, providing your current occupation and your intent for staying. I am willing to provide more pictures of the room and the apartment upon request. Looking for a subletter for {apartment type} apartment located {location}. The room is equipped with {furnished? }. Talk if utilities are included in the rent.  Seperate the content using Title:  Content: ';
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 300,
  });
  
  const basePromptOutput = baseCompletion.choices.pop();

//   const secondPrompt = 
//   'revise the sublease post and make it cleaner. Here is the post: ';
//   const secondPromptCompletion = await openai.completions.create({
//     model: "gpt-3.5-turbo-instruct",
//     prompt: `${secondPrompt}${basePromptOutput}\n`,
//     temperature: 0.8,
//     max_tokens: 300,
//   });
//   const secondPromptoutput = secondPromptCompletion.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;