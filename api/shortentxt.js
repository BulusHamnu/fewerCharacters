export default async function shortenText(req, res) {
  const apiKey = process.env.OPEN_API_KEY;
  let endpoint = `https://api.openai.com/v1/chat/completions`;

  if (!req.body || !req.body.sentences || !req.body.limit) {
    return res
      .status(400)
      .json({ status: false, message: "Missing required parameters." });
  }

  const { sentences, limit } = req.body;

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

      //console.log(data.choices[0].message.content.trim());
      res.status(200).json({ summary: resultArray });
    } else {
      let err = await response.json();

      console.log(
        "An error occured while getting text summary using OpenApi: statusCode",
        response.status,
        err
      );
      res.status(response.status).json({
        status: false,
        message:
          response.status == 429
            ? "Can't make any request right now."
            : "An error ocurred, please try again later.",
      });
    }
  } catch (error) {
    console.log(
      "An error occured while getting text summary using OpenApi: ",
      error
    );
    res.status(500).json({ status: false, message: "Internal server error." });
  }
}
