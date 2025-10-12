/* Source code */
const sendBtn = document.querySelector(".send-button");
let copyBtn;
const error = document.querySelector(".error");
const limitNum = document.querySelector("#charLimit");
const textInput = document.querySelector("#inputText");
const outputText = document.querySelectorAll(".outputText");
const clearBtn = document.querySelector(".clear-button");
const main = document.querySelector("main");

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

/* Function for display summary result */
function displaySentences(sentencesArray) {
  if (sentencesArray?.length <= 0) return;

  let section = document.createElement("section");
  section.classList.add("text-output");

  if (!Array.isArray(sentencesArray)) {
    section.innerHTML = `
                <label for="outputText">Output</label>
                <textarea class="outputText" placeholder="Generated text will apply here.." required >${sentencesArray}</textarea>
                <button class="copy-button" aria-label="Copy shortened text" data-textid="0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                     Copy
                </button>
            `;

    main.appendChild(section);
  } else {
    sentencesArray.forEach((element, index) => {
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
  }

  copyBtn = document.querySelectorAll(".copy-button");
  copyBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let allTextOutput = document.querySelectorAll(".outputText");

      navigator.clipboard.writeText(allTextOutput[btn.dataset.textid].value);
      btn.textContent = "Copied!";

      setTimeout(() => {
        btn.textContent = "Copy";
      }, 3000);
    });
  });
}

/* Function for initiating request */
async function sendRequest(e) {
  let sentences = textInput.value;
  let limit = parseInt(limitNum.value);

  // remove output-text section
  const outputSection = main.querySelector(".text-output");
  outputSection && main.removeChild(outputSection);

  if (sentences.length >= 40 && limit >= 20) {
    // HUGGING_FACE_AI, OPEN_AI
    let textResult = await shortenSentences(
      sentences,
      limit,
      "HUGGING_FACE_AI"
    );

    displaySentences(textResult);
    if (textResult) {
      clearBtn.style.display = "block";
    }
  } else {
    error.style.display = "block";
    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  }
}

/* Button event listeners */
sendBtn.addEventListener("click", sendRequest);

clearBtn.addEventListener("click", (e) => {
  const buttonText = e.target.textContent;

  switch (buttonText) {
    case "Paste":
      navigator.clipboard
        .readText()
        .then((text) => {
          textInput.value = text;
          textInput.focus();
          e.target.textContent = "Clear";
        })
        .catch((err) => {
          console.log("An error ocured while pasting text to clipboard.", err);
          alert("Failed to paste clipboard text");
        });
      // e.target.textContent = "Clear";
      break;

    case "Clear":
      textInput.value = "";
      outputText.forEach((text) => {
        text.value = "";
      });

      e.target.textContent = "Paste";
      break;
    default:
      break;
  }
});
