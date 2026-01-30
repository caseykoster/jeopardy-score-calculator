export default function PlayerCard({ 
  player, 
  isSelected, 
  onSelect, 
  onNameChange, 
  onRemove, 
  canRemove 
}) {
  const formatScore = (score) => {
    const prefix = score < 0 ? '-' : '';
    return `${prefix}$${Math.abs(score).toLocaleString()}`;
  };

  return (
    <div
      onClick={onSelect}
      className={`player-card ${isSelected ? 'selected' : ''}`}
    >
      <input
        type="text"
        value={player.name}
        onChange={(e) => onNameChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="player-name-input"
      />
      <div className={`player-score ${player.score < 0 ? 'negative' : 'positive'}`}>
        {formatScore(player.score)}
      </div>
      {canRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="remove-player-btn"
        >
          ×
        </button>
      )}
    </div>
  );
}