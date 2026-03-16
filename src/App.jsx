import { useState, useEffect  } from 'react';
import PlayerCard from './components/PlayerCard';
import PointButtons from './components/PointButtons';
import CustomWager from './components/CustomWager';
import History from './components/History';
import './App.css';

const POINT_VALUES = [200, 400, 600, 800, 1000];
const DOUBLE_JEOPARDY_VALUES = [400, 800, 1200, 1600, 2000];
const DEFAULT_PLAYERS = [
  { id: 1, name: 'Player 1', score: 0 },
  { id: 2, name: 'Player 2', score: 0 },
  { id: 3, name: 'Player 3', score: 0 },
];

const loadFromStorage = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function App() {
  const [players, setPlayers] = useState(() => loadFromStorage('jeopardy-players', DEFAULT_PLAYERS));
  const [selectedPlayer, setSelectedPlayer] = useState(() => loadFromStorage('jeopardy-selected', 1));
  const [isDoubleJeopardy, setIsDoubleJeopardy] = useState(() => loadFromStorage('jeopardy-double', false));
  const [history, setHistory] = useState(() => loadFromStorage('jeopardy-history', []));
 
  useEffect(() => {
    localStorage.setItem('jeopardy-players', JSON.stringify(players));
  }, [players]);
 
  useEffect(() => {
    localStorage.setItem('jeopardy-selected', JSON.stringify(selectedPlayer));
  }, [selectedPlayer]);
 
  useEffect(() => {
    localStorage.setItem('jeopardy-double', JSON.stringify(isDoubleJeopardy));
  }, [isDoubleJeopardy]);
 
  useEffect(() => {
    localStorage.setItem('jeopardy-history', JSON.stringify(history));
  }, [history]);

  const pointValues = isDoubleJeopardy ? DOUBLE_JEOPARDY_VALUES : POINT_VALUES;

  const updateScore = (playerId, amount) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId ? { ...p, score: p.score + amount } : p
      )
    );
    const player = players.find(p => p.id === playerId);
    setHistory(prev => [
      { playerId, playerName: player.name, amount, timestamp: Date.now() },
      ...prev,
    ]);
  };

  const undoLast = () => {
    if (history.length === 0) return;
    const lastAction = history[0];
    setPlayers(prev =>
      prev.map(p =>
        p.id === lastAction.playerId
          ? { ...p, score: p.score - lastAction.amount }
          : p
      )
    );
    setHistory(prev => prev.slice(1));
  };

  const resetGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setHistory([]);
    setIsDoubleJeopardy(false);
  };

  const updatePlayerName = (id, name) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, name } : p))
    );
  };

  const addPlayer = () => {
    const newId = Math.max(...players.map(p => p.id)) + 1;
    setPlayers(prev => [...prev, { id: newId, name: `Player ${newId}`, score: 0 }]);
  };

  const removePlayer = (id) => {
    if (players.length <= 1) return;
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (selectedPlayer === id) {
      setSelectedPlayer(players.find(p => p.id !== id)?.id || 1);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">JEOPARDY!</h1>
        <p className="subtitle">Score Calculator</p>
      </header>

      {/* Round Toggle */}
      <div className="round-toggle">
        <button
          onClick={() => setIsDoubleJeopardy(false)}
          className={`round-button ${!isDoubleJeopardy ? 'active' : ''}`}
        >
          Jeopardy!
        </button>
        <button
          onClick={() => setIsDoubleJeopardy(true)}
          className={`round-button ${isDoubleJeopardy ? 'active' : ''}`}
        >
          Double Jeopardy!
        </button>
      </div>

      {/* Players */}
      <div className="players-section">
        <div className="players-grid">
          {players.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayer === player.id}
              onSelect={() => setSelectedPlayer(player.id)}
              onNameChange={(name) => updatePlayerName(player.id, name)}
              onRemove={() => removePlayer(player.id)}
              canRemove={players.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          onClick={undoLast}
          disabled={history.length === 0}
          className="control-btn"
        >
          ↩ Undo
        </button>
      </div>

      {/* Point Values */}
      <PointButtons
        pointValues={pointValues}
        onScore={(amount) => updateScore(selectedPlayer, amount)}
      />

      {/* Custom Amount */}
      <CustomWager
        onScore={(amount) => updateScore(selectedPlayer, amount)}
      />

      {/* Change Game */ }
      <div className="players-section">
        <div className="players-grid">
          {players.length < 6 && (
            <button onClick={addPlayer} className="add-player-btn">
              + Add Player
            </button>
          )}
          <button onClick={resetGame} className="reset-btn">
          Reset Game
        </button>
        </div>
      </div>

      {/* History */}
      <History history={history} />
    </div>
  );
}