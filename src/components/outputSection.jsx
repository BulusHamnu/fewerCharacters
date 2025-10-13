// output text componet
const OutputSection = ({ summary }) => {
  const { useRef } = React;
  const outputText = useRef(null);

  function handleCopyBtnClick(btn) {
    navigator.clipboard.writeText(outputText.current.value);
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 3000);
  }

  return (
    <section className={`text-output`}>
      <label for="outputText">Output</label>
      <textarea
        ref={outputText}
        class="outputText"
        placeholder="Generated text will apply here.."
        required
      >
        {summary}
      </textarea>
      {/* copy button for output */}
      <button
        onClick={(e) => handleCopyBtnClick(e.target)}
        class="copy-button"
        aria-label="Copy shortened text"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
        </svg>
        Copy
      </button>
    </section>
  );
};

window.OutputSection = OutputSection;
