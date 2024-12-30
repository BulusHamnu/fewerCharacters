export default async function shortenText(req, res) {

    const apiKey = process.env.fewerChararcterKey;
    let endpoint = `https://api.openai.com/v1/chat/completions`;

    if (!req.body || !req.body.sentences || !req.body.limit) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const { sentences, limit } = req.body;

    try {
        let response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "gpt-4o-mini", 
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that shortens text."
                    },
                    {
                        "role": "user",
                        "content": `Shorten the following text to fit within ${limit} characters while preserving its meaning and give me three or choices to choose from:\n\n${sentences}`
                    }
                ],
                "temperature": 0.7
            })
        });

        if (response.ok) {
            let data = await response.json();

            //console.log(data.choices[0].message.content.trim());
            res.status(200).json({ summary: data.choices });
            // res.status(200).json({ summary: data.choices[0].message.content.trim() });
        } else {
            res.status(response.status).json({ error: 'Failed to fetch from OpenAI API.' });
        }
    } catch (error) {
           res.status(500).json({ error: 'Internal server error.' });
    }

}