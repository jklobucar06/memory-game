interface WinMessageProps {
    moves: number,
    onReset: () => void,
};

const WinMessage = ({moves, onReset}: WinMessageProps) => {
  return (
    <div className="win-overlay">
        <div className="win-message">
            <h2>Congratulations!</h2>
            <p>You completed the game in {moves} moves!</p>
            <button className="reset-btn" onClick={onReset} >New Game</button>
        </div>
    </div>
  )
};

export default WinMessage;