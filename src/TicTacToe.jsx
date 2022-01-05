import './TicTacToe.css'
import Board from './Board'
import {useState} from 'react'

export default function TicTacToe() {
  const [whosTurn, setWhosTurn] = useState('X')
  const [winner, setWinner] = useState(null)
  const [shouldResetBoard, setShouldResetBoard] = useState(false)

  function resetGame() {
    setWinner(null)
    setShouldResetBoard(true)
  }

  function getGameMessage() {
    if (winner === 'X') {
      return 'X is the winner!'
    } else if (winner === 'O') {
      return 'O is the winner!'
    } else if (winner === 'NONE') {
      return 'Game over, no winner!'
    }
  }

  return (
    <div className={'app'}>
      <h1 className={'game-title'}>Tic-Tac-Toe</h1>
      <Board whosTurn={whosTurn} setWhosTurn={setWhosTurn}
             winner={winner} setWinner={setWinner}
             shouldResetBoard={shouldResetBoard} setShouldResetBoard={setShouldResetBoard}/>
      <div className={'message-area'}>
        {getGameMessage()}
      </div>
      <button type={'button'} onClick={resetGame}>New Game</button>
    </div>
  )
}
