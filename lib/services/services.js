const contentType = 'application/json'

export const createDefaultBoard = async () => {
  const board = await fetch('/api/board', {
    method: 'POST',
    headers: { contentType, 'Content-Type': contentType },
    body: JSON.stringify({ title: 'Default Board' })
  })
  //if not ok
  if (!board.ok) {
    throw new Error(board.status)
  }
  const { data } = await board.json()
  return data
}

export const createLane = async (laneData) => {
  const lane = await fetch('/api/lane', {
    method: 'POST',
    headers: { contentType, 'Content-Type': contentType },
    body: JSON.stringify(laneData)
  })
  //if not ok
  if (!lane.ok) {
    throw new Error(lane.status)
  }

  const { data } = await lane.json()
  return data
}

export const createCard = async (cardData) => {
  const card = await fetch('/api/card', {
    method: 'POST',
    headers: { contentType, 'Content-Type': contentType },
    body: JSON.stringify(cardData)
  })

  if (!card.ok) {
    throw new Error(card.status)
  }

  const { data } = await card.json()
  return data
}

export const updateBoard = async (newBoard) => {
  try {
    console.log("SERVICE", newBoard)
    const board = await fetch(`api/board/${newBoard.id}`, {
      method: 'PUT',
      headers: { contentType, 'Content-Type': contentType },
      body: JSON.stringify(newBoard)
    })
    return board
  } catch (error) {
    console.log(error.message)
  }
}
