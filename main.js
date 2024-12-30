/* Source code */
const sendBtn = document.querySelector(".send-button")
const copyBtn = document.querySelector(".copy-button");
const error = document.querySelector(".error");
const limitNum = document.querySelector("#charLimit")
const textInput = document.querySelector("#inputText")
const outputText = document.querySelector("#outputText");
const  clearBtn = document.querySelector(".clear-button")
let HuggingFaceAPI = `https://api-inference.huggingface.co/models/facebook/bart-large-cnn`;



let counts = 0;

/* Using OpenAi API */
async function shortenSentences(sentences, limit) {

    try {
        let response = await fetch(`/api/shortentxt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "sentences": `${sentences}`,
                    "limit": `${limit}`
                }                
            )
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data.summary.trim());
            
            return data.summary.trim(); 
        } else {
            counts--;
            if(counts > 0) {
                alert("API request limit exceeded, retrying in 5 seconds...");
                setTimeout(() => {
                    shortenSentences(sentences, limit)
                },5000)

            } else {
                alert("unable to proceed please try again later!");
            }

        }
    } catch (error) {
        console.error('Error:', error);
    }
}


/* Using Hugging face API */
async function shortenSentences2 (sentences,limit) {

    try {
        let response = await fetch(HuggingFaceAPI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKeyHuggingFace}`
            },
            body: JSON.stringify({
                "inputs": `Summarize this text to fit within a character limit of ${limit}, without losing important information: ${sentences}`,
                "parameters": {
                    "max_length": limit,
                    "min_length": limit/2,
                    "top_k": 50,
                    "top_p": 0.9,
                    "temperature": 0.5
                }
            })
        })
    
        
        if (response.ok) {
            let data = await response.json();
            let result = data[0].summary_text;
           // console.log(data[0].summary_text);
    
            return result;
        } else {
            counts--;
            if(counts > 0) {
                alert("API request limit exceeded, retrying in 5 seconds...");
                setTimeout(() => {
                    shortenSentences2(textInput.value,parseInt(limitNum.value))
                },5000)
                    
            } else {
                    alert("unable to proceed please try again later!");
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
}



async function sendRequest(e) {
    let sentences = textInput.value;
    let limit = parseInt(limitNum.value);
    
    if (sentences.length >= 40 && limit >= 20) {
        // outputText.textContent = await shortenSentences2(sentences, limit);
        counts = 3;
        outputText.textContent = await shortenSentences(sentences, limit);
        if(outputText.textContent) {
            clearBtn.style.display = 'block';
        }

    } else {
        error.style.display = "block";
        setTimeout(() => {error.style.display = "none";}, 3000);

    }
    
}



/* Button event listeners */
sendBtn.addEventListener('click',sendRequest)

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.value);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {copyBtn.textContent = "Copy";}, 3000);
});

clearBtn.addEventListener("click", () => {
    textInput.value = "";
    outputText.textContent = "";
    clearBtn.style.display = 'none';
});

