// src/components/CardStack.jsx
import React from 'react';
import CatCard from './CatCard';
import TinderCard from 'react-tinder-card';

function CardStack({ cats, currentIndex, onSwipe }) {
  const handleSwipe = (direction) => {
    if (direction === 'right') {
      onSwipe(true);
    } else if (direction === 'left') {
      onSwipe(false);
    }
  };

  // Only show current cat
  const cat = cats[currentIndex];

  return (
    <div className="card-stack">
      <TinderCard
        key={cat.id}
        onSwipe={handleSwipe}
        preventSwipe={['up', 'down']}
      >
        <CatCard cat={cat} />
      </TinderCard>
      <div className="swipe-instructions">
        <span>👈 Dislike &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Like 👉</span>
      </div>
    </div>
  );
}

export default CardStack;
