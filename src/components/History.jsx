export default function History({ history }) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history-section">
      <h3 className="section-title">Recent</h3>
      <div className="history-list">
        {history.slice(0, 5).map((entry) => (
          <div key={entry.timestamp} className="history-item">
            <span>{entry.playerName}</span>
            <span className={entry.amount > 0 ? 'history-positive' : 'history-negative'}>
              {entry.amount > 0 ? '+' : ''}${entry.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}