// src/components/Summary.jsx
import React from 'react';

function Summary({ likes, onRestart }) {
  return (
    <div className="summary">
      <h2>You liked {likes.length} cat{likes.length !== 1 ? 's' : ''}!</h2>
      <div className="liked-cats">
        {likes.map(cat => (
          <img key={cat.id} src={cat.url} alt="Liked cat" className="cat-img-small" />
        ))}
      </div>
      <button className="restart-btn" onClick={onRestart}>Restart</button>
    </div>
  );
}

export default Summary;
