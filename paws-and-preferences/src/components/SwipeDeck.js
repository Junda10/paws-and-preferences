import React, { useState, useEffect, useRef } from 'react';
import { fetchRandomCat } from '../services/cataas';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

export default function SwipeDeck({ onComplete }) {
  const maxCount = 10;
  const [catUrl, setCatUrl] = useState(null);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [history, setHistory] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [count, setCount] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [undoCat, setUndoCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const isUndoing = useRef(false);

  // Fetch new cat when count changes (except for undo)
  useEffect(() => {
    if (isUndoing.current) {
      isUndoing.current = false;
      return;
    }
    setLoading(true);
    fetchRandomCat()
      .then((url) => {
        setCatUrl(url);
        setCardKey((k) => k + 1);
      })
      .catch(() => setCatUrl(null))
      .finally(() => setLoading(false));
  }, [count]);

  // Show previous cat immediately on undo
  useEffect(() => {
    if (undoCat) {
      setCatUrl(undoCat);
      setLoading(false);
      setUndoCat(null);
    }
  }, [undoCat]);

  // End condition: call onComplete when finished
  useEffect(() => {
    if (count >= maxCount) onComplete(liked, disliked);
  }, [count, liked, disliked, onComplete, maxCount]);

  // Handle a swipe when swipeDirection is set
  useEffect(() => {
    if (!swipeDirection) return;
    if (swipeDirection === 'right') {
      setLiked((prev) => [...prev, catUrl]);
      setHistory((prev) => [...prev, { catUrl, action: 'right' }]);
    } else if (swipeDirection === 'left') {
      setDisliked((prev) => [...prev, catUrl]);
      setHistory((prev) => [...prev, { catUrl, action: 'left' }]);
    }
    setCount((c) => c + 1);
    setSwipeDirection(null);
  }, [swipeDirection, catUrl]);

  // Button swipe handler
  const handleButtonSwipe = (dir) => {
    if (!loading && !swipeDirection) setSwipeDirection(dir);
  };

  // Swipe by dragging
  const handleDragEnd = (_, info) => {
    if (swipeDirection) return;
    if (info.offset.x > 120) setSwipeDirection('right');
    else if (info.offset.x < -120) setSwipeDirection('left');
  };

  // Undo last swipe
  const handleUndo = () => {
    if (history.length === 0 || count === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCount((c) => c - 1);
    if (last.action === 'right') setLiked((prev) => prev.slice(0, -1));
    if (last.action === 'left') setDisliked((prev) => prev.slice(0, -1));
    setUndoCat(last.catUrl);
    isUndoing.current = true;
  };

  return (
    <div className="fancy-bg">
      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="glass-sidebar"
          >
            <button
              onClick={() => setShowHistory(false)}
              className="close-btn"
              aria-label="Close history sidebar"
            >×</button>
            <div className="history-label">History</div>
            <div style={{ marginBottom: 28 }}>
              <div className="history-list-label" style={{ color: '#23bb77' }}>Liked ({liked.length})</div>
              <div className="thumb-wrap">
                {liked.length === 0 && <span style={{ color: '#bbb' }}>No liked images yet.</span>}
                {liked.map((url, i) => (
                  <img key={i} src={url} alt="liked" className="thumb-img" />
                ))}
              </div>
            </div>
            <div>
              <div className="history-list-label" style={{ color: '#ff415f' }}>Disliked ({disliked.length})</div>
              <div className="thumb-wrap">
                {disliked.length === 0 && <span style={{ color: '#bbb' }}>No disliked images yet.</span>}
                {disliked.map((url, i) => (
                  <img key={i} src={url} alt="disliked" className="thumb-img disliked" />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {showHistory && <div onClick={() => setShowHistory(false)} className="sidebar-overlay" />}

      {/* History Button */}
      <button
        onClick={() => setShowHistory((v) => !v)}
        className="fancy-history-btn"
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {/* Deck or end message */}
      {count >= maxCount ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#444', fontWeight: 500 }}>
          All done!<br /><br />
          <span style={{ color: '#888', fontSize: 18 }}>
            You can still view your like/dislike history on the sidebar.
          </span>
        </div>
      ) : (
        <>
          <div className="deck-container">
            <AnimatePresence mode="wait">
              {(loading || !catUrl) ? (
                <motion.div
                  key="loading"
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    color: '#aaa',
                    background: '#fff'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Loading kitten…
                </motion.div>
              ) : (
                swipeDirection ? (
                  <motion.div
                    key={cardKey + '-' + swipeDirection}
                    className="card"
                    style={{ backgroundImage: `url(${catUrl})` }}
                    initial={{ x: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    exit={
                      swipeDirection === 'left'
                        ? { x: -420, opacity: 0, rotate: -18 }
                        : { x: 420, opacity: 0, rotate: 18 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  >
                    <div className="card-overlay"></div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={cardKey}
                    className="card"
                    style={{ backgroundImage: `url(${catUrl})` }}
                    initial={{ x: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.85}
                    onDragEnd={handleDragEnd}
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(20,60,80,0.22)' }}
                  >
                    <div className="card-overlay"></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          <div className="swipe-instruction">
            Swipe left to <span style={{ color: '#ff415f', fontWeight: 800 }}>dislike</span>, right to <span style={{ color: '#23bb77', fontWeight: 800 }}>like</span>!
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

          <div style={{ width: "100%", textAlign: "center", marginTop: 18 }}>
            <button
              className="undo-btn"
              onClick={handleUndo}
              disabled={history.length === 0 || swipeDirection !== null || loading || count === 0}
            >↩️ Undo Last Swipe</button>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: 20,
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: 0.2,
            color: '#555'
          }}>
            Cat {count + 1} / {maxCount}
          </div>
        </>
      )}
    </div>
  );
}
