/* Source code */
const sendBtn = document.querySelector(".send-button")
let copyBtn;
const error = document.querySelector(".error");
const limitNum = document.querySelector("#charLimit")
const textInput = document.querySelector("#inputText")
const outputText = document.querySelectorAll(".outputText");
const  clearBtn = document.querySelector(".clear-button");
const main = document.querySelector("main");
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
            
            // console.log(data.summary);
            return data.summary; 
            
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


function displaySentences(sentencesArray) {
    sentencesArray.forEach((element,index) => {

        let section = document.createElement('section');
        section.classList.add('text-output');
        section.innerHTML = `
            <label for="outputText">Output-${index + 1}</label>
            <textarea class="outputText" placeholder="Generated text will apply here.." required >${element}</textarea>
            <button class="copy-button" aria-label="Copy shortened text" data-textid=${index}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                 Copy
            </button>
        `;

        main.appendChild(section);

    });

    copyBtn = document.querySelectorAll(".copy-button");
    copyBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            let allTextOutput = document.querySelectorAll(".outputText")
            
            navigator.clipboard.writeText(allTextOutput[btn.dataset.textid].value);
            btn.textContent = "Copied!";
        
            setTimeout(() => {btn.textContent = "Copy";}, 3000);
        });
    });

}


async function sendRequest(e) {

    if (e.target.textContent === "Patse") {
        navigator.clipboard.readText().then(text => {
            textInput.value = text;
            textInput.focus();
            e.target.textContent = "Send"

        }).catch(err => {
            alert("Failed to paste clipboard text")
        });
    } else if (e.target.textContent === "Send") {
        let sentences = textInput.value;
    let limit = parseInt(limitNum.value);
    
    if (sentences.length >= 40 && limit >= 20) {
        // outputText.textContent = await shortenSentences2(sentences, limit);
        counts = 3;
        let textResult = await shortenSentences(sentences, limit);

        displaySentences(textResult)
        if(textResult) {
            clearBtn.style.display = 'block';
        }

    } else {
        error.style.display = "block";
        setTimeout(() => {error.style.display = "none";}, 3000);

    }
    }

    
    
}



/* Button event listeners */
sendBtn.addEventListener('click',sendRequest)


clearBtn.addEventListener("click", () => {
    textInput.value = "";
    outputText.forEach((text) => {
        text.value = "";
    });
    clearBtn.style.display = 'none';

});

