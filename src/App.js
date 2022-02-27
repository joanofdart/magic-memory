import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurn(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // handle two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          })
        );
      }

      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  // handle reset
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((turn) => turn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turn}</p>
    </div>
  );
}

export default App;
