import React from 'react'
import Board from 'react-trello'
import {
  createDefaultBoard,
  createLane,
  createCard,
  updateBoard
} from '../../lib'

export const Tasks = () => {
  const [board, setBoards] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async () => {
    const res = await fetch('/api/board')
    const board = await res.json()
    if (board.data.length === 0) {
      let defaultBoard = await createDefaultBoard()
      setBoards(defaultBoard)
      setLoading(false)
    }
    setBoards(board.data[0])
    setLoading(false)
  }, [])

  const handleBoardUpdate = async (newBoard) => {
    console.log(newBoard)
    const updatedBoard = { id: board?._id, ...newBoard }
    let res = await updateBoard(updatedBoard)
    console.log(res)
  }

  if (loading) {
    return <h1>LOADING....</h1>
  }

  return (
    <Board
      data={board}
      editLaneTitle={true}
      editable={true}
      canAddLanes={true}
      onDataChange={handleBoardUpdate}
      draggable
    />
  )
}
