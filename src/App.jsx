import { useState } from 'react';
import './App.css'
import GameBoard from './components/GameBoard/GameBoard'
import Log from './components/Log/Log';
import Player from './components/Player/Player'
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver/GameOver';

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}

function App() {
  
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  const [gameTurn, setGameTurn] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurn);

  let gameBoard = initialGameBoard.map(array => [...array]);
  let winner;

  for (const turn of gameTurn) {

    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const isDraw = gameTurn.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurn((prevTurns) => {
      const updatedTurn = [{
        square: {
          row: rowIndex, 
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns];

      return updatedTurn;
    })
  };

  const handleNewGame = () => {
    setGameTurn([]);
  };  

  const handlePlayerNameChange = (symbol, newName) => {
    console.log( symbol);
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className='highlight-player'>
         <Player name="player 1" symbol="X" onNameChange={handlePlayerNameChange} />
         <Player name="player 2" symbol="O" onNameChange={handlePlayerNameChange} />
        </ol>
        {
          (winner || isDraw) && 
          <GameOver winner={winner} onReset={handleNewGame}/>
        }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>

      <Log turns={gameTurn} />
    </main>
  )
}

export default App
