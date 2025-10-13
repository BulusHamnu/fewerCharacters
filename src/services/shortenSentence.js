/* Send request */
async function shortenSentences(sentences, limit, useApi = "OPEN_API") {
  try {
    let response = await fetch(`/api/shortentxt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sentences: `${sentences}`,
        limit: `${limit}`,
        useApi,
      }),
    });

    if (response.ok) {
      let data = await response.json();
      return data.summary;
    } else {
      let error = await response.json();
      console.log(
        "An error occured while getting text from the backend: ",
        error
      );
      alert(error.message);
      return [];
    }
  } catch (error) {
    console.log("An error occured:", error);
  }
}

window.shortenSentences = shortenSentences