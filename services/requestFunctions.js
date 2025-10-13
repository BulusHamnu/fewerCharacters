// openAPI service
export async function useOpenAPI(sentences, limit) {
  const apiKey = process.env.OPEN_API_KEY;
  let endpoint = `https://api.openai.com/v1/chat/completions`;

  try {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that shortens text.",
          },
          {
            role: "user",
            content: `Shorten the following text to fit within ${limit} characters while preserving its meaning:\n\n${sentences}`,
          },
        ],
        n: 3,
        temperature: 0.7,
      }),
    });

    if (response.ok) {
      let data = await response.json();

      let resultArray = data.choices.map((value) => {
        return value.message.content.trim();
      });

      return resultArray;
    } else {
      let err = await response.json();

      console.log(
        "An error occured while getting text summary using OpenApi: statusCode",
        response.status,
        err
      );

      return [];
    }
  } catch (error) {
    console.log(
      "An error occured while getting text summary using OpenApi: statusCode",
      response.status,
      error
    );

    return [];
  }
}

// hugging face
export async function useHuggingFace(sentences, limit) {
  let HuggingFaceAPI = `https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-V3.2-Exp:novita`;
  const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

  try {
    let response = await fetch(HuggingFaceAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: `Summarize this text to fit within a character limit of ${limit}, without losing important information: ${sentences}`,
        parameters: {
          /* max_length: limit,
          min_length: limit / 2, */
          top_k: 50,
          top_p: 0.9,
          temperature: 0.5,
        },
      }),
    });

    if (response.ok) {
      let data = await response.json();
      let result = data[0].summary_text;

      return result;
    } else {
      console.log(response)
      let err = await response.json();
      console.log(
        "An error occured while getting text summary using Hugging face AI: statusCode",
        response.status,
        err
      );
      return [];
    }
  } catch (error) {
    console.log(
      "An error occured while getting text from the backend using: ",
      error
    );
    return [];
  }
}

// hugging face: deepseek model sentences, limit
export async function useHuggingFace2(sentences, limit) {
  let HuggingFaceAPI = `https://router.huggingface.co/v1/chat/completions`;
  const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

  try {
    let response = await fetch(HuggingFaceAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that shortens text.",
          },
          {
            role: "user",
            content: `Shorten the following text to fit within ${limit} characters while preserving its meaning:\n\n${sentences}`,
          },
        ],
        model: "deepseek-ai/DeepSeek-V3.2-Exp:novita",
        stream: false,
      }),
    });

    if (response.ok) {
      let data = await response.json();
      let result = data[0].summary_text;

      return result;
    } else {
      let err = await response.json();
      console.log(
        "An error occured while getting text summary using Hugging face AI: statusCode",
        response.status,
        err
      );
      return [];
    }
  } catch (error) {
    console.log(
      "An error occured while getting text from the backend using: ",
      error
    );
    return [];
  }
}

