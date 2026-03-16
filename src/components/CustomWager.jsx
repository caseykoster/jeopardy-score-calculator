import { useState } from 'react';

export default function CustomWager({ onScore, customAmount, setCustomAmount  }) {
  const handleCustomAmount = (isCorrect) => {
    const amount = parseInt(customAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      onScore(isCorrect ? amount : -amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="custom-section">
      <h3 className="section-title">Daily Double / Final Jeopardy</h3>
      <div className="custom-row">
        <span className="dollar-sign">$</span>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Wager amount"
          className="custom-input"
        />
        <button
          onClick={() => handleCustomAmount(true)}
          className="correct-btn"
        >
          ✓
        </button>
        <button
          onClick={() => handleCustomAmount(false)}
          className="incorrect-btn"
        >
          ✗
        </button>
      </div>
    </div>
  );
}