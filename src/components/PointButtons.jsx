export default function PointButtons({ pointValues, onScore }) {
  return (
    <div className="points-section">
      <h3 className="section-title">Quick Score</h3>
      <div className="points-row">
        {pointValues.map(value => (
          <div key={value} className="point-group">
            <button
              onClick={() => onScore(value)}
              className="correct-btn"
            >
              +${value}
            </button>
            <button
              onClick={() => onScore(-value)}
              className="incorrect-btn"
            >
              -${value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}