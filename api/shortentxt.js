import { useOpenAPI, useHuggingFace } from "../services/requestFunctions.js";
export default async function shortenText(req, res) {
  const method = req.method;

  if (method === "POST") {
    if (!req.body || !req.body.sentences || !req.body.limit) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required parameters." });
    }
    const { sentences, limit } = req.body;

    try {
      let result = null;
      req.body.useApi === "OPEN_AI"
        ? (result = await useOpenAPI(sentences, limit))
        : (result = await useHuggingFace(sentences, limit));

      if (result?.length <= 0) {
        return res.status(502).json({
          status: false,
          message: "An error ocurred, please try again later.",
        });
      }

      res.status(200).json({ summary: result });
    } catch (error) {
      console.log("An error occured while processing request: ", error);
      res
        .status(500)
        .json({ status: false, message: "Internal server error." });
    }
  } else {
    res.status(405).json({ status: false, message: "Method not allowed." });
  }
}
