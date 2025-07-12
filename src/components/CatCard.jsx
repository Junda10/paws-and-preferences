// src/components/CatCard.jsx
import React from 'react';

function CatCard({ cat }) {
  return (
    <div className="cat-card">
      <img src={cat.url} alt="Cute Cat" className="cat-img" />
    </div>
  );
}

export default CatCard;
