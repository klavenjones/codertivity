import React from 'react'

export const Issues = ({ issues }) => {
  console.log('Issues', issues)
  return (
    <>
      <ul>
        {issues.map((issue, i) => (
          <li key={issue.sha}>issue {i}</li>
        ))}
      </ul>
    </>
  )
}
