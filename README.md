# FewerCharacter
## Overview
This project is a web application that uses a vercel serverless function to interact with the OpenAI API: gpt-4o-mini model, and HuggingFace router model: DeepSeek-V3.2-Exp:novita to shorten a given text to fit within a specified character limit while preserving its meaning. The project supports multiple responses for varied summaries. I made this project to learn integrating AI/Model into the backend to handle tasks.

[Live demo](fewer-characters.vercel.app)
## Features

- Accepts user input (text and character limit) through a web interface.
- Sends requests to a serverless backend hosted on Vercel.
- Generates concise summaries within the specified character limit.
- Provides multiple summary options to the user.

## Technologies Used
- I use React, ReactRouterDom cdn for the front-end and Babel compiler as well to support the jsx

### Backend:
- Vercel: For hosting the serverless backend.
- Integrate with AI model through API: For generating text summaries.



