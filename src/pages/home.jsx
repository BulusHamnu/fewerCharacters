// App homepage
const HomePage = () => {
  const { useState } = React;
  const [summaries, setSummaries] = useState("");

  return (
    <>
      <Header />
      <main>
        <InputSection setSummaries={setSummaries} />

        {summaries.length <= 0 ? (
          ""
        ) : !Array.isArray(summaries) ? (
          <OutputSection summary={summaries} />
        ) : (
          summaries.map((summary, index) => (
            <OutputSection summary={summaries} key={index} />
          ))
        )}
      </main>
    </>
  );
};

window.HomePage = HomePage;
