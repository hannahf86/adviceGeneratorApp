import { useEffect, useState } from "react";

interface Slip {
  id: number;
  advice: string;
}

async function fetchAdvice() {
  const response = await fetch('https://api.adviceslip.com/advice', { cache: "no-cache", });
  const data = await response.json();
  return data.slip
}

function App() {

  const [slip, setSlip] = useState<Slip | null>(null);

  useEffect(() => {
    fetchAdvice()
    .then(slip => setSlip(slip))
    .catch(error => setSlip(error))
  }, []);

  const handleNewAdviceClick = () => {
    fetchAdvice()
    .then(slip => setSlip(slip))
    // console.log('This is working!')
  }

    // --- LOADING AND ERRORS  ---
  if (!slip) return <p>Loading...</p>

  return (
    <>
      <div id="container">
        <div id="quoteContainer">
          <p>ADVICE #{slip.id}</p>
          <h1>{slip.advice}</h1>

          <div id="divider">
            <img src="src/assets/pattern-divider-mobile.svg"></img>
          </div>

          <div id="diceContainer">
            <button onClick={handleNewAdviceClick} className="dice" name="dice">
              <img src="src/assets/icon-dice.svg"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
