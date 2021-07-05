import React from 'react'

export const Branches = ({ branches }) => {

  return (
    <>
      <ul>
        {branches.map((branch, i) => (
          <li>Branches {branch.name}</li>
        ))}
      </ul>
    </>
  )
}
