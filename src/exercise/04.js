// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  // 🐨 squares is the state for this component. Add useState for squares
  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('ttt:board', [
    Array(9).fill(null),
  ])
  const [stepNumber, setStepNumber] = useLocalStorageState('ttt:stepNumber', 0)

  const currentBoard = squares[stepNumber]
  const winner = calculateWinner(currentBoard)
  const nextValue = calculateNextValue(currentBoard)
  const status = calculateStatus(winner, currentBoard, nextValue)

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy

    if (winner || currentBoard[square]) {
      return
    }

    const newBoard = [...squares[stepNumber]]
    newBoard[square] = nextValue
    setSquares(squares.concat([newBoard]))
    setStepNumber(stepNumber + 1)
  }

  function goToMove(moveNumber) {
    const newSquares = squares.slice(0, moveNumber + 1)
    setStepNumber(moveNumber)
    setSquares(newSquares)
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setStepNumber(0)
    setSquares([Array(9).fill(null)])
  }

  const moves = currentBoard.map((move, i) => {
    if (!move) {
      return null
    }
    return (
      <li>
        <button disabled={i + 1 === stepNumber} onClick={() => goToMove(i)}>
          Go to move #{i + 1}
          {i + 1 === stepNumber ? ' (current)' : null}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={currentBoard} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          <li>
            <button disabled={stepNumber === 0} onClick={() => goToMove(0)}>
              Go to game start {stepNumber === 0 ? ' (current)' : null}
            </button>
          </li>
          {moves}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  // debugger
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
