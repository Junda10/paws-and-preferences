import React, { useState, useEffect } from 'react';
import { fetchRandomCat } from '../services/cataas';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

export default function SwipeDeck({ onComplete }) {
  const [catUrl, setCatUrl] = useState(null);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [count, setCount] = useState(0);
  const maxCount = 10; // Total cats before "all done"

  // Load the first cat on mount and after each swipe
  useEffect(() => {
    setLoading(true);
    fetchRandomCat()
      .then((url) => setCatUrl(url))
      .finally(() => setLoading(false));
  }, [count]);

  // End after maxCount
  useEffect(() => {
    if (count >= maxCount && maxCount > 0) {
      onComplete(liked);
    }
  }, [count, liked, onComplete, maxCount]);

  // Called by button or drag
  const handleButtonSwipe = (dir) => {
    if (swipeDirection === null && !loading) setSwipeDirection(dir);
  };

  // Animation exit triggers this
  const handleCardExit = () => {
    if (swipeDirection === 'right') setLiked((prev) => [...prev, catUrl]);
    setSwipeDirection(null);
    setCount(c => c + 1);
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120 && swipeDirection === null) setSwipeDirection('right');
    else if (info.offset.x < -120 && swipeDirection === null) setSwipeDirection('left');
  };

  if (count >= maxCount) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>All done!</div>;
  }

  if (loading || !catUrl) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading kitten…</div>;
  }

  return (
    <div className="deck-outer">
      <div className="deck-container" style={{ position: 'relative', width: 320, height: 440 }}>
        <AnimatePresence>
          {swipeDirection === null && (
            <motion.div
              key={catUrl}
              className="card"
              style={{ backgroundImage: `url(${catUrl})`, width: 300, height: 400, margin: '0 auto' }}
              initial={{ x: 0, opacity: 1, rotate: 0 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={
                swipeDirection === 'left'
                  ? { x: -400, opacity: 0, rotate: -20 }
                  : swipeDirection === 'right'
                  ? { x: 400, opacity: 0, rotate: 20 }
                  : { opacity: 0 }
              }
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              onAnimationComplete={() => {
                if (swipeDirection) handleCardExit();
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%,transparent 60%)', borderRadius: 16
              }}>
                <div style={{ color: '#fff', fontSize: 20, padding: 12, fontWeight: 600 }}>Swipe or use buttons!</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="swipe-btn-row">
        <button
          className="swipe-btn dislike"
          onClick={() => handleButtonSwipe('left')}
          disabled={swipeDirection !== null || loading}
        >❎ Dislike</button>
        <button
          className="swipe-btn like"
          onClick={() => handleButtonSwipe('right')}
          disabled={swipeDirection !== null || loading}
        >❤️ Like</button>
      </div>
      <div style={{textAlign: 'center', marginTop: 12}}>Cat {count + 1} / {maxCount}</div>
    </div>
  );
}
