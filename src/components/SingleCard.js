import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled}) => {

    const handleClick = (card)=>{
        if(!disabled){
            handleChoice(card)
        }
    }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front" />
        <img onClick={()=>{handleClick(card)}} src="/img/cover.png" className="back" alt="back" />
      </div>
    </div>
  );
};

export default SingleCard;
