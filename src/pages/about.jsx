// App aboutpage
const AboutPage = () => {
  return (
    <>
      <Header />
      <main class="about-main">
        <h1>About Fewer Characters</h1>
        <h2>Introduction</h2>
        <p>
          Welcome to FewerCharacters.com – your simple and effective solution
          for shortening text to fit within any character limit! Whether you're
          looking to fit your text into a tweet, a message, or a specific field
          with a character limit, we make it easy to reduce your content without
          losing its meaning.
        </p>
        <h2>How It Works</h2>
        <p>Using FewerCharacters.com is quick and easy:</p>
        <ul>
          <li>
            <b>Enter your text:</b> Paste your content into the text box.
          </li>
          <li>
            <b>Set the character limit:</b> Choose the number of characters you
            want to limit your text to.
          </li>
          <li>
            <b>Click Send:</b> Our tool processes your input and shortens the
            text accordingly.
          </li>
          <li>
            <b>Copy your shortened text:</b> The shortened version is displayed
            in a second text box, ready for you to copy and use!
          </li>
        </ul>
        <p>
          If you ever need to trim down a message or description to fit within a
          specific character count, FewerCharacters.com is here to help!
        </p>
      </main>
    </>
  );
};

window.About = AboutPage;
