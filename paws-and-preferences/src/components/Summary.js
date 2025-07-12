import React from 'react';
import '../App.css';

export default function Summary({ likedCats = [], dislikedCats = [], onRestart }) {
  return (
    <div
      style={{
        padding: '2rem 1.5rem 2.5rem 1.5rem',
        textAlign: 'center',
        maxWidth: 520,
        margin: '2.5rem auto 0 auto',
        borderRadius: 28,
        background: 'linear-gradient(120deg, #f8fafc 70%, #e0f7fa 100%)',
        boxShadow: '0 8px 32px rgba(34, 60, 80, 0.14)'
      }}
    >
      <h2 style={{
        color: '#23bb77', margin: 0, marginBottom: 12, fontWeight: 700, fontSize: 22, letterSpacing: 1
      }}>
        You liked {likedCats.length} {[0, 1].includes(likedCats.length) ? 'kitty' : 'kitties'}!
      </h2>
      <div className="fancy-grid">
        {likedCats.length === 0 && <span style={{ color: '#aaa' }}>No liked cats!</span>}
        {likedCats.map((url) => (
          <img
            key={url}
            src={url}
            alt="Liked cat"
            className="fancy-img"
          />
        ))}
      </div>
      {Array.isArray(dislikedCats) && dislikedCats.length > 0 && (
        <>
          <h3 style={{
            marginTop: 36, color: '#ff415f', fontWeight: 700, fontSize: 22, letterSpacing: 1
          }}>
            You disliked {dislikedCats.length} {[0, 1].includes(dislikedCats.length) ? 'kitty' : 'kitties'}!
          </h3>
          <div className="fancy-grid">
            {dislikedCats.map((url) => (
              <img
                key={url}
                src={url}
                alt="Disliked cat"
                className="fancy-img disliked"
              />
            ))}
          </div>
        </>
      )}
      <button
        onClick={onRestart}
        className="fancy-restart-btn"
      >
        Try Again
      </button>
    </div>
  );
}
