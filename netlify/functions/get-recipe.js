// import Anthropic from "@anthropic-ai/sdk";

// export default async function handler(event, context) {
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Content-Type': 'application/json'
//   };

//   try {
//     // Handle ReadableStream
//     let bodyData = '';
//     if (event.body && typeof event.body.getReader === 'function') {
//       const reader = event.body.getReader();
//       let done = false;
      
//       while (!done) {
//         const { value, done: readerDone } = await reader.read();
//         if (value) {
//           bodyData += new TextDecoder().decode(value);
//         }
//         done = readerDone;
//       }
//     } else if (event.body) {
//       bodyData = event.body;
//     }

//     console.log('Body data after stream reading:', bodyData);

//     // Parse the body
//     let parsedBody;
//     try {
//       parsedBody = typeof bodyData === 'string' ? JSON.parse(bodyData) : bodyData;
//     } catch (e) {
//       console.error('Parse error:', e);
//       return new Response(
//         JSON.stringify({
//           error: 'Failed to parse request body',
//           bodyData: bodyData
//         }),
//         { status: 400, headers }
//       );
//     }

//     console.log('Parsed body:', parsedBody);

//     // Extract and validate ingredients
//     const ingredients = parsedBody?.ingredients;
//     if (!Array.isArray(ingredients) || ingredients.length === 0) {
//       return new Response(
//         JSON.stringify({
//           error: 'Invalid ingredients array',
//           parsedBody: parsedBody
//         }),
//         { status: 400, headers }
//       );
//     }

//     console.log('Ingredients:', ingredients);

//     // Initialize Anthropic
//     const anthropic = new Anthropic({
//       apiKey: process.env.ANTHROPIC_API_KEY
//     });

//     // Generate recipe
//     const msg = await anthropic.messages.create({
//       model: "claude-3-haiku-20240307",
//       max_tokens: 1024,
//       system: "You are a helpful cooking assistant.",
//       messages: [
//         {
//           role: "user",
//           content: `I have ${ingredients.join(", ")}. Suggest a recipe!`
//         }
//       ]
//     });

//     return new Response(
//       JSON.stringify({ recipe: msg.content[0].text }),
//       { status: 200, headers }
//     );

//   } catch (error) {
//     console.error('Server error:', error);
//     return new Response(
//       JSON.stringify({
//         error: 'Server error',
//         message: error.message,
//         stack: error.stack
//       }),
//       { status: 500, headers }
//     );
//   }
// }

// import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from "@huggingface/inference";

export default async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // Create Request object and parse JSON
    const request = new Request(event.url, {
      method: event.method,
      headers: event.headers,
      body: event.body,
      duplex: 'half'  // Required in Node.js when sending a body
    });

    const json = await request.json();
    console.log('Parsed request body:', json);

    // Validate ingredients
    const ingredients = json?.ingredients;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid ingredients array',
          receivedBody: json
        }),
        { status: 400, headers }
      );
    }

    // // Initialize Anthropic
    // const anthropic = new Anthropic({
    //   apiKey: process.env.ANTHROPIC_API_KEY
    // });
    //Initialize HFInference
    const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

    // Generate recipe
    const SYSTEM_PROMT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;
    // const msg = await anthropic.messages.create({
    //   model: "claude-3-haiku-20240307",
    //   max_tokens: 1024,
    //   system: SYSTEM_PROMT,
    //   messages: [
    //     {
    //       role: "user",
    //       content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!`
    //     }
    //   ]
    // });
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
          { role: "system", content:SYSTEM_PROMT },
          { role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
  })
    return new Response(
      JSON.stringify({ recipe: response.choices[0].message.content}),
      { status: 200, headers }
    );
    // return new Response(
    //   JSON.stringify({ recipe: msg.content[0].text }),
    //   { status: 200, headers }
    // );
  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({
        error: 'Server error',
        message: error.message,
        stack: error.stack
      }),
      { status: 500, headers }
    );
  }
}