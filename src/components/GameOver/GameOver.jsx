const GameOver = ({winner, onReset}) => {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} wins!</p>}
        {!winner && <p>draw game!</p>}
        <button onClick={onReset}>Retry</button>
    </div>
  )
}

export default GameOver