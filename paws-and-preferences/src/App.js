import React, { useState } from 'react';
import SwipeDeck from './components/SwipeDeck';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [completed, setCompleted] = useState(false);
  const [likedCats, setLikedCats] = useState([]);
  const [dislikedCats, setDislikedCats] = useState([]);

  return (
    <div className="App">
      <h1>Paws & Preferences</h1>
      {!completed ? (
        <SwipeDeck
          onComplete={(liked, disliked) => {
            setLikedCats(liked);
            setDislikedCats(disliked);
            setCompleted(true);
          }}
        />
      ) : (
        <Summary
          likedCats={likedCats}
          dislikedCats={dislikedCats}
          onRestart={() => {
            setLikedCats([]);
            setDislikedCats([]);
            setCompleted(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
