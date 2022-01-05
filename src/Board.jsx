import './Board.css'
import {useEffect, useState} from 'react'

export default function Board(props) {
	const {whosTurn, setWhosTurn, winner, setWinner, shouldResetBoard, setShouldResetBoard} = props
	const [boardArray, setBoardArray] = useState(new Array(9))

	useEffect(() => {
		if (shouldResetBoard) {
			setBoardArray(new Array(9))
			setShouldResetBoard(false)
		}
	}, [shouldResetBoard])

	function onSquareClick(squareIndex) {
		if (winner || boardArray[squareIndex]) {
			return
		}

		const newBoardArray = [...boardArray]
		newBoardArray[squareIndex] = whosTurn
		setBoardArray(newBoardArray)

		const determinedWinner = determineWinner(newBoardArray)

		if (determinedWinner) {
			setWinner(determinedWinner)
		} else {
			if (isBoardFull(newBoardArray)) {
				setWinner('NONE')
			}
			toggleTurn()
		}
	}

	function toggleTurn() {
		if (whosTurn === 'X') {
			setWhosTurn('O')
		} else if (whosTurn === 'O') {
			setWhosTurn('X')
		} else {
			console.error('Invalid turn state')
		}
	}

	return (
		<div className='tic-tac-toe-board'>
			{
				[...Array(9).keys()].map((index) => {
					return (
						<div key={index} className='tic-tac-toe-square' onClick={() => onSquareClick(index)}>
							{boardArray[index]}
						</div>
					)
				})
			}
		</div>
	)
}

function determineWinner(board) {
	const arraysOfAdjacentBoardIndexes = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let adjacentIndexes of arraysOfAdjacentBoardIndexes) {
		const [a, b, c] = adjacentIndexes
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[adjacentIndexes[0]]
		}
	}
}

function isBoardFull(board) {
	return board.every((square) => !!square)
}
