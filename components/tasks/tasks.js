import React from 'react'
import Board from 'react-trello'

const data = {
  lanes: [
    {
      id: 'dshjfkhsdjkhfjksdhk',
      userId: 'kjljdskajdklsajkldfjs',
      title: 'Planned Tasks',
      cards: [
        {
          id: 'Milk',
          title: 'Buy milk',
          label: '15 mins',
          description: '2 Gallons of milk at the Deli store'
        },
        {
          id: 'Plan2',
          title: 'Dispose Garbage',
          label: '10 mins',
          description: 'Sort out recyclable and waste as needed'
        },
        {
          id: 'Plan3',
          title: 'Write Blog',
          label: '30 mins',
          description: 'Can AI make memes?'
        },
        {
          id: 'Plan4',
          title: 'Pay Rent',
          label: '5 mins',
          description: 'Transfer to bank account'
        }
      ]
    }
  ]
}

export const Tasks = () => {
  return (
    <Board
      data={data}
      editLaneTitle={true}
      editable={true}
      canAddLanes={true}
      draggable
    />
  )
}
