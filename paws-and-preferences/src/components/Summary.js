import React from 'react';
import '../App.css';

export default function Summary({ likedCats, onRestart }) {
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h2>You liked {likedCats.length} kitty(ies)!</h2>
      <div className="grid">
        {likedCats.map((url) => (
          <img
            key={url}
            src={url}
            alt="Liked cat"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        ))}
      </div>
      <button onClick={onRestart} style={{ marginTop: '1rem' }}>
        Try Again
      </button>
    </div>
  );
}
