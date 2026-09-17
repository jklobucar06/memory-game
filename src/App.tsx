import { useEffect, useState } from "react";
import Card, { type CardType } from "./components/Card";
import GameHeader from "./components/GameHeader";
import WinMessage from "./components/WinMessage";

const CARD_VALUES = ["🍎", "🍌", "🍇", "🍊", "🍓", "🥝", "🍑", "🍒", "🍎", "🍌", "🍇", "🍊", "🍓", "🥝", "🍑", "🍒"];



const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const initializeGame = () => {
    setHasWon(false);
    setFlippedCards([]);
          const flippedBackCards = cards.map(c => {
            return {...c, isFlipped: false, isMatched: false};
          });
    setCards(flippedBackCards);
    setScore(0);
    setMoves(0);
    setMatchedCards([]);
    const shuffledCards = shuffleCards();

    const finalCards = shuffledCards.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);

  }

  const shuffleCards = () => {
    const isPresent: boolean[] = Array(CARD_VALUES.length).fill(false);
    const shuffledCards: string[] = [];

    for(let i = 0; i < CARD_VALUES.length; i++) {
      let index = Math.floor(Math.random() * CARD_VALUES.length);

      if(isPresent[index]) {
        i--;
        continue;
      }
      isPresent[index] = true;
      shuffledCards[i] = CARD_VALUES[index];
    }

    return shuffledCards;
  }

  const handleCardClick = (card: CardType) => {
    if(flippedCards.length === 2 || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) => {
      if(c.id === card.id) return {...c, isFlipped: true};
      else return c;
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if(flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];

      if(firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards(c => [...c, firstCard.id, card.id]);
          const newMatchedCards = newCards.map(c => {
          if(c.id === card.id || c.id === firstCard.id) 
              return {...c, isMatched: true};
            return c;
          });

          setCards(newMatchedCards);
          setFlippedCards([]);
          setScore(s => s + 1);
          setMoves(m => m + 1);
        }, 600);

      } else {

        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
          if(newFlippedCards.includes(c.id))
            return {...c, isFlipped: false};
          else 
            return c;
          });

          setCards(flippedBackCards);
          setFlippedCards([]);
          setMoves(m => m + 1);
        }, 600);
        
      }  
       if(score + 1 === CARD_VALUES.length / 2) {
        setTimeout(() => {
          setHasWon(true);
        }, 1500);
       };      
    }
  }

  useEffect(() => {
    initializeGame();
  }, []); 

  useEffect(() => {
    if(!hasWon) return;

    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = "";};
    
  }, [hasWon]);

  return (
    <div className="app">
      <GameHeader score={score} moves={moves}/>
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={() => handleCardClick(card)}/>
        ))}
      </div>

      {hasWon && (
        <WinMessage moves={moves} onReset={initializeGame}/>
      )}
    </div>
  )
}

export default App

