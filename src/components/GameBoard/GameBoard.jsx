const GameBoard = ({onSelectSquare, board}) => { 
  return (
    <ol id="game-board">
        {board.map((row, rowIndex) => {
          return <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex)=> {
                return <button onClick={ () => onSelectSquare(rowIndex, colIndex)} key={colIndex} disabled={playerSymbol !== null}>{playerSymbol} </button> 
              })}
            </ol>
          </li>
        })}
    </ol>
  )
}

export default GameBoard