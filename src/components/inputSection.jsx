// input text componet
const InputSection = ({ setSummaries }) => {
  const { useState } = React;
  const [clearButtonStatus, setClearButtonStatus] = useState("Paste");
  // const [copiedText, setCopied] = useState("");
  const textArea = useRef(null);
  const [limitInput, setLimitInput] = useState(20);
  const [inputError, setInputError] = useState(false);

  // copy or clear text button onclick handler
  function handleClearBtnClick() {
    switch (clearButtonStatus) {
      case "Paste":
        navigator.clipboard
          .readText()
          .then((text) => {
            textArea.current.value = text;
            textArea.current.focus();

            setClearButtonStatus("Clear");
          })
          .catch((err) => {
            console.log(
              "An error ocured while pasting text to clipboard.",
              err
            );
            alert("Failed to paste clipboard text");
          });
        break;

      case "Clear":
        textArea.current.value = "";

        setClearButtonStatus("Paste");
        break;

      default:
        break;
    }
  }

  /* Function for initiating request */
  async function sendRequest(e) {
    let sentences = textArea.current.value;
    let limit = parseInt(limitInput);
    setSummaries("");

    if (sentences.length >= 40 && limit >= 20) {
      // HUGGING_FACE_AI, OPEN_AI
      let textResult = await shortenSentences(
        sentences,
        limit,
        "HUGGING_FACE_AI"
      );

      setSummaries(textResult);
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    }
  }

  return (
    <section class="text-input">
      <div class="top-label">
        <label for="inputText">Input text</label>
        <label for="charLimit" id="limitLable">
          Limit
        </label>
        <input
          onChange={(e) => setLimitInput(e.target.value)}
          type="number"
          name="limit"
          id="charLimit"
          value={limitInput}
          min="20"
        ></input>
      </div>
      <textarea
        id="inputText"
        ref={textArea}
        placeholder="input your text here.."
      ></textarea>

      {inputError && (
        <div class="error">
          Text should not be less than 40 characters and limit should not be
          less than 20!
        </div>
      )}

      <div class="btn-cont">
        <button
          onClick={() => handleClearBtnClick()}
          class="clear-button"
          aria-label="clear text"
        >
          {clearButtonStatus}
        </button>
        <button
          onClick={() => sendRequest()}
          class="send-button"
          aria-label="Submit text for shortening"
        >
          Send
        </button>
      </div>
    </section>
  );
};

window.InputSection = InputSection;
