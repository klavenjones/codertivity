import React from 'react'

export const Contributors = ({ contributors }) => {
  return (
    <>
      <ul>
        {contributors.map((contributor, i) => (
          <li key={contributor.id}>Contributor {contributor.login}</li>
        ))}
      </ul>
    </>
  )
}
