import React, { useEffect, useState } from "react";
import { Card as CardType } from "../types/game";

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);

  useEffect(() => {
    if (card.isMatched) {
      setShowMatchAnimation(true);
      const timer = setTimeout(() => {
        setShowMatchAnimation(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [card.isMatched]);

  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={`memory-card ${
        card.isFlipped || card.isMatched ? "flipped" : ""
      } 
                 ${card.isMatched ? "matched" : ""} 
                 ${showMatchAnimation ? "match-animation" : ""}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </div>
  );
};

export default Card;
