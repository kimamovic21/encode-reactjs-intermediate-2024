import { useEffect, useState } from 'react'

import { PLAYER } from './constants';
import './App.css'

function App() {
  const [activePlayer, setActivePlayer] = useState(PLAYER.TWO);
  const [boardValues, setBoardValues] = useState(['', '', '', '', '', '', '', '', '']);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0
  })

  const handleFieldClick = (position) => {
    const boardValuesCopy = [...boardValues];
    if (!boardValuesCopy[position] && !gameOver) {
      boardValuesCopy[position] = activePlayer;
      setBoardValues(boardValuesCopy);
    }
  }

  const checkIfGameOver = () => {
    // 0,1,2 
    // 3,4,5
    // 6,7,8

    // 0,3,6
    // 1,4,7
    // 2,5,8

    // 0,4,8
    // 2,4,6

    const filledFields = boardValues.filter(value => value !== '');

    if (
      // first item has value, second has value, third has value 
      // first equal to second and second equal to third
      (boardValues[0] && boardValues[1] && boardValues[2] &&
        boardValues[0] === boardValues[1] && boardValues[0] === boardValues[2]) ||
      (boardValues[3] && boardValues[4] && boardValues[5] &&
        boardValues[3] === boardValues[4] && boardValues[3] === boardValues[5]) ||
      (boardValues[6] && boardValues[7] && boardValues[8] &&
        boardValues[6] === boardValues[7] && boardValues[6] === boardValues[8]) ||

      (boardValues[0] && boardValues[3] && boardValues[6]
        && boardValues[0] === boardValues[3] && boardValues[0] === boardValues[6]) ||
      (boardValues[1] && boardValues[4] && boardValues[7]
        && boardValues[1] === boardValues[4] && boardValues[1] === boardValues[7]) ||
      (boardValues[2] && boardValues[5] && boardValues[8]
        && boardValues[2] === boardValues[5] && boardValues[2] === boardValues[8]) ||

      (boardValues[0] && boardValues[4] && boardValues[8]
        && boardValues[0] === boardValues[4] && boardValues[0] === boardValues[8]) ||
      (boardValues[2] && boardValues[4] && boardValues[6]
        && boardValues[2] === boardValues[4] && boardValues[2] === boardValues[6])
    ) {
      setGameOver(true);
      setWinner(activePlayer);
      const scoresCopy = {...scores};

      scoresCopy[activePlayer] += 1;

      setScores(scoresCopy);

    } else if (filledFields.length === 9) {
      setGameOver(true);
      setWinner('DRAW');
    } else {
      setActivePlayer((prevState) => prevState === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE);
    }

  }

  useEffect(() => {
    checkIfGameOver();
  }, [boardValues]);

  const playAgain = () => {
    setBoardValues(['', '', '', '', '', '', '', '', '']);
    setActivePlayer(PLAYER.TWO);
    setGameOver(false);
    setWinner('');
  }

  return (
    <div>
      <div>
        <h2>SCOREBOARD</h2>
        <div className='score'>
          Player 1 (X) {scores.X}&nbsp;-&nbsp;{scores.O} Player 2 (O)
        </div>
      </div>
      <h1>Tic Tac Toe</h1>
      <div className='board'>
        <div className='field' onClick={() => handleFieldClick(0)} disabled={gameOver}>
          {boardValues[0]}
        </div>
        <div className='field' onClick={() => handleFieldClick(1)} disabled={gameOver}>
          {boardValues[1]}
        </div>
        <div className='field' onClick={() => handleFieldClick(2)} disabled={gameOver}>
          {boardValues[2]}
        </div>

        <div className='field' onClick={() => handleFieldClick(3)} disabled={gameOver}>
          {boardValues[3]}
        </div>
        <div className='field' onClick={() => handleFieldClick(4)} disabled={gameOver}>
          {boardValues[4]}
        </div>
        <div className='field' onClick={() => handleFieldClick(5)} disabled={gameOver}>
          {boardValues[5]}
        </div>

        <div className='field' onClick={() => handleFieldClick(6)} disabled={gameOver}>
          {boardValues[6]}
        </div>
        <div className='field' onClick={() => handleFieldClick(7)} disabled={gameOver}>
          {boardValues[7]}
        </div>
        <div className='field' onClick={() => handleFieldClick(8)} disabled={gameOver}>
          {boardValues[8]}
        </div>
      </div>
      {gameOver &&
        <div>
          <h2>Game over</h2>
          {winner === 'DRAW' ? <h2>It's a draw</h2> : <h2>Winner is player: <b>{winner}</b></h2>}
          <button onClick={playAgain}>PLAY AGAIN ?</button>
        </div>
      }
    </div>
  )
}

export default App;
