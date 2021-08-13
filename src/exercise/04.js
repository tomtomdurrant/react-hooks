// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

// const EMPTY_BOARD = Array(9).fill(null)
function Board({squares, selectSquare}) {
  // 🐨 squares is the state for this component. Add useState for squares

  // const [squares, setSquares] = React.useState(() => {
  //   const localStorageBoard = window.localStorage.getItem('board')
  //   if (localStorageBoard) {
  //     return JSON.parse(localStorageBoard)
  //   }
  //   return EMPTY_BOARD
  // })
  // squares[0] = 'X'
  // squares[1] = 'O'
  // squares[2] = 'X'
  // squares[3] = 'O'
  // squares[4] = 'X'
  // squares[5] = 'O'
  // squares[6] = 'X'
  // const [squares, setSquares] = React.useState(initialSquares)
  // const [winner, setWinner] = React.useState(calculateWinner(squares))
  // const [nextValue, setNextValue] = React.useState(null)

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
  console.log({squares})

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
  console.log('Current History', squares)
  const [stepNumber, setStepNumber] = useLocalStorageState('ttt:stepNumber', 0)
  const currentBoard = squares[stepNumber]
  console.log('Current Board', currentBoard)
  // debugger
  const winner = calculateWinner(currentBoard)
  const nextValue = calculateNextValue(currentBoard)
  const status = calculateStatus(winner, currentBoard, nextValue)

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    console.log('Select Square', square)
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
    // if (squares[square]) {
    //   return
    // }
    // if (winner) {
    //   console.log('Winner')
    //   return
    // }
    // setNextValue(calculateNextValue(squares))
    // const newSquares = [...squares]
    // newSquares[square] = nextValue
    // setSquares(newSquares)
    if (winner || currentBoard[square]) {
      return
    }

    const newBoard = [...squares[stepNumber]]
    newBoard[square] = nextValue
    setSquares(squares.concat([newBoard]))
    console.log('nbaldasdj', squares)
    setStepNumber(stepNumber + 1)
  }

  function goToMove(moveNumber) {
    console.log('Going to move ', moveNumber)
    debugger
    const newSquares = squares.slice(0, moveNumber)
    setSquares(newSquares)
    setStepNumber(moveNumber)
    console.log('squares are', squares)
    console.log('new Squares', newSquares)
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setSquares(Array(9).fill(null))
    setStepNumber(0)
  }

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
          {currentBoard.filter(Boolean).map((move, i) => {
            if (i === 0) {
              return (
                <li>
                  <button onClick={() => goToMove(0)}>Go to game start</button>
                </li>
              )
            }
            return (
              <li key={i}>
                <button disabled={stepNumber === i} onClick={() => goToMove(i)}>
                  Go to {i === 0 ? 'game start' : `move #${i}`}
                </button>
              </li>
            )
          })}
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
