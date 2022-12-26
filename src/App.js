import { useCallback, useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const CARDIMAGES = [
  { src: "/img/potion-1.png"  , matched: false },
  { src: "/img/ring-1.png"  , matched: false},
  { src: "/img/helmet-1.png" , matched: false },
  { src: "/img/scroll-1.png" , matched: false },
  { src: "/img/shield-1.png" , matched: false },
  { src: "/img/sword-1.png" , matched: false },
];

function App() {
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffeledCards = [...CARDIMAGES, ...CARDIMAGES]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));

      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(0);
      setCards(shuffeledCards);
  };
  

  //handle choice
  const handleChoice = (card) =>{
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card); 
  }

  //compare 2 selected cards


  //reset choice and increase turn
  const resetTurn = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(preTurns => preTurns + 1);
    setDisabled(false);
  }

  //to check if both cards are same and updating matched if yes
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
         setCards(preCard =>{
            return preCard.map((card)=>{
                if(card.src === choiceOne.src){
                  return {...card, matched: true}
                }else{
                  return card;
                }
            })
         }) 
         resetTurn();
      }else{
        setTimeout(()=>{
          resetTurn();
        }, 1000)
        
      }
    }
  },[choiceOne, choiceTwo]);
 
  //starting the game at the beginning
  useEffect(()=>{
    shuffleCards();
  },[]);

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New Game</button>
    
      <div className="card-grid">
      {cards.map((card) => (
        <SingleCard 
        handleChoice={handleChoice} 
        card={card} 
        flipped={card === choiceOne ||  card === choiceTwo || card.matched}
        key={card.id}
        disabled={disabled}
        />
      ))}
    </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
