import React, { useState, useEffect, useRef } from 'react';
import { fetchRandomCat } from '../services/cataas';
import { motion, AnimatePresence } from 'framer-motion';
//import '../App.css';

// --- Styles ---
const fancyBg = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(120deg, #f8fafc 70%, #e0f7fa 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '0 0 64px 0',
};

const deckContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 400,
  minHeight: 520,
  margin: '2rem auto',
  borderRadius: 36,
  boxShadow: '0 8px 32px rgba(34,60,80,0.18)',
  background: 'rgba(255,255,255,0.83)',
  backdropFilter: 'blur(5px)',
  position: 'relative',
};

const cardStyle = {
  width: '100%',
  aspectRatio: '4/5',
  maxWidth: 380,
  maxHeight: 480,
  borderRadius: 28,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '0 8px 32px rgba(20,60,80,0.18)',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
};

const cardOverlay = {
  position: 'center',
  left: 0,
  bottom: 0,
  width: '100%',
  padding: '20px 16px 16px 16px',
  background: 'linear-gradient(to top, rgba(0,0,0,0.56) 0%,transparent 70%)',
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
};

const labelStyle = {
  textAlign: 'center',
  color: '#fff',
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: 1.1,
  textShadow: '0 3px 16px #0007',
};

const glassSidebar = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100vh',
  width: 340,
  background: 'rgba(255,255,255,0.86)',
  boxShadow: '-4px 0 32px #0002',
  zIndex: 2000,
  padding: 32,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(12px) saturate(1.12)',
  borderTopLeftRadius: 28,
  borderBottomLeftRadius: 28,
};

const historyLabel = {
  fontWeight: 700,
  fontSize: 22,
  marginBottom: 18,
  marginTop: 2,
  color: '#7955e8',
  textAlign: 'center',
  letterSpacing: 1,
};

const thumbWrap = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
  minHeight: 40,
  marginTop: 10,
  marginBottom: 16,
};

const thumbImg = {
  width: 64,
  height: 64,
  objectFit: 'cover',
  borderRadius: 12,
  boxShadow: '0 2px 10px #d6e3f7a0',
  border: '3px solid #7955e8', // Both like and dislike use same color now
  transition: 'transform 0.14s, box-shadow 0.14s',
};

const dislikedExtra = { filter: 'grayscale(0.4)', opacity: 0.7 };

const closeBtn = {
  position: 'absolute',
  top: 16,
  right: 20,
  fontSize: 26,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#aaa',
  fontWeight: 700,
  zIndex: 2,
};

const historyBtn = {
  padding: '10px 32px',
  fontSize: 18,
  background: 'linear-gradient(90deg, #f8cdda 40%, #1d2b64 100%)',
  border: 'none',
  borderRadius: 30,
  color: '#fff',
  fontWeight: 600,
  boxShadow: '0 2px 8px #b5b5ec70',
  cursor: 'pointer',
  margin: '18px 0',
  letterSpacing: 0.5,
  transition: 'transform 0.12s, box-shadow 0.14s, filter 0.14s',
};

const swipeInstructionStyle = {
  textAlign: 'center',
  color: '#7955e8',
  background: 'rgba(255,255,255,0.76)',
  borderRadius: 18,
  margin: '32px 0 18px 0',
  fontWeight: 700,
  fontSize: 20,
  padding: '13px 18px 12px 18px',
  letterSpacing: 0.5,
  boxShadow: '0 2px 14px #7955e814',
};

export default function SwipeDeck({ onComplete }) {
  const maxCount = 5;
  const [catUrl, setCatUrl] = useState(null);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [count, setCount] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const hasSwiped = useRef(false);

  useEffect(() => {
    setLoading(true);
    fetchRandomCat()
      .then((url) => {
        setCatUrl(url);
        setCardKey((k) => k + 1);
        setSwipeDirection(null);
        hasSwiped.current = false;
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setCatUrl(null);
      })
      .finally(() => setLoading(false));
  }, [count]);

  useEffect(() => {
    if (count >= maxCount) onComplete(liked, disliked);
  }, [count, liked, disliked, onComplete, maxCount]);

  const handleButtonSwipe = (dir) => {
    if (!loading && swipeDirection === null) setSwipeDirection(dir);
  };

  const handleCardExit = () => {
    if (hasSwiped.current) return;
    hasSwiped.current = true;
    if (swipeDirection === 'right') setLiked((prev) => [...prev, catUrl]);
    if (swipeDirection === 'left') setDisliked((prev) => [...prev, catUrl]);
    setSwipeDirection(null);
    setCount((c) => c + 1);
  };

  const handleDragEnd = (_, info) => {
    if (swipeDirection !== null) return;
    if (info.offset.x > 120) setSwipeDirection('right');
    else if (info.offset.x < -120) setSwipeDirection('left');
  };

  return (
    <div style={fancyBg}>
      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            style={glassSidebar}
          >
            <button
              onClick={() => setShowHistory(false)}
              style={closeBtn}
              aria-label="Close history sidebar"
            >×</button>
            <div style={historyLabel}>History</div>
            <div style={{ marginBottom: 28 }}>
              <div className="history-list-label" style={{ color: '#7955e8', fontWeight: 700 }}>Liked ({liked.length})</div>
              <div style={thumbWrap}>
                {liked.length === 0 && <span style={{ color: '#bbb' }}>No liked images yet.</span>}
                {liked.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="liked"
                    style={{ ...thumbImg }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="history-list-label" style={{ color: '#ff415f', fontWeight: 700 }}>Disliked ({disliked.length})</div>
              <div style={thumbWrap}>
                {disliked.length === 0 && <span style={{ color: '#bbb' }}>No disliked images yet.</span>}
                {disliked.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="disliked"
                    style={{ ...thumbImg, ...dislikedExtra }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {showHistory && (
        <div
          onClick={() => setShowHistory(false)}
          className="sidebar-overlay"
        />
      )}

      {/* History Button */}
      <button
        onClick={() => setShowHistory((v) => !v)}
        style={historyBtn}
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
          {/* Card Area */}
          <div style={deckContainer}>
            <AnimatePresence mode="wait">
              {(loading || !catUrl) ? (
                <motion.div
                  key="loading"
                  style={{
                    ...cardStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    color: '#aaa',
                    background: '#fff',
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
                    style={{
                      ...cardStyle,
                      backgroundImage: `url(${catUrl})`,
                    }}
                    initial={{ x: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    exit={
                      swipeDirection === 'left'
                        ? { x: -420, opacity: 0, rotate: -18 }
                        : { x: 420, opacity: 0, rotate: 18 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                    onAnimationComplete={handleCardExit}
                  >
                    <div style={cardOverlay}></div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={cardKey}
                    className="card"
                    style={{
                      ...cardStyle,
                      backgroundImage: `url(${catUrl})`,
                    }}
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
                    <div style={cardOverlay}></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          {/* SWIPE INSTRUCTION */}
          <div style={swipeInstructionStyle}>
            Swipe left to <span style={{ color: '#ff415f', fontWeight: 800 }}>dislike</span>, right to <span style={{ color: '#23bb77', fontWeight: 800 }}>like</span>!
          </div>

          {/* BUTTON ROW */}
          <div className="swipe-btn-row" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 56,
            marginTop: 22,
            marginBottom: 18,
            width: '100%',
            maxWidth: 520,
          }}>
            <button
              className="swipe-btn dislike"
              onClick={() => handleButtonSwipe('left')}
              disabled={swipeDirection !== null || loading}
              style={{
                background: 'linear-gradient(45deg, #ff415f, #ffb199)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
                borderRadius: 40,
                boxShadow: '0 2px 10px #ff415f22',
                minWidth: 160,
                padding: '20px 0',
                letterSpacing: 1.2,
                transition: 'transform 0.12s, box-shadow 0.18s, filter 0.12s',
              }}
            >❎ Dislike</button>
            <button
              className="swipe-btn like"
              onClick={() => handleButtonSwipe('right')}
              disabled={swipeDirection !== null || loading}
              style={{
                background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 22,
                borderRadius: 40,
                boxShadow: '0 2px 10px #43e97b22',
                minWidth: 160,
                padding: '20px 0',
                letterSpacing: 1.2,
                transition: 'transform 0.12s, box-shadow 0.18s, filter 0.12s',
              }}
            >❤️ Like</button>
          </div>

          {/* Counter */}
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
