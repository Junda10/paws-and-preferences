// src/App.jsx
import React, { useState, useEffect } from 'react';
import CardStack from './components/CardStack';
import Summary from './components/Summary';
import axios from 'axios';
import './App.css';

const NUM_CATS = 12; // or any number between 10-20

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // Fetch cat images on mount
  useEffect(() => {
    const fetchCats = async () => {
      let arr = [];
      for (let i = 0; i < NUM_CATS; i++) {
        // Get random cat image JSON (we only need the url)
        const res = await axios.get('https://cataas.com/cat?json=true');
        arr.push({
          id: res.data._id,
          url: `https://cataas.com/cat/${res.data._id}?width=400&height=400`
        });
      }
      setCats(arr);
    };
    fetchCats();
  }, []);

  // Called after every swipe
  const handleSwipe = (liked) => {
    if (liked) setLikes([...likes, cats[currentIndex]]);
    if (currentIndex < cats.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  // Reset (optional)
  const handleRestart = () => {
    setCurrentIndex(0);
    setLikes([]);
    setShowSummary(false);
  };

  return (
    <div className="App">
      <h1>Paws & Preferences 🐾</h1>
      {cats.length === 0 ? (
        <div>Loading cats...</div>
      ) : showSummary ? (
        <Summary likes={likes} onRestart={handleRestart} />
      ) : (
        <CardStack
          cats={cats}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
        />
      )}
    </div>
  );
}

export default App;
