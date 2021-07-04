import React from 'react'

export const Pulls = ({ pulls }) => {
  return (
    <>
      <ul>
        {pulls.map((pull, i) => (
          <li key={commit.sha}>pull {i}</li>
        ))}
      </ul>
    </>
  )
}
