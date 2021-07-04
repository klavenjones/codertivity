import React from 'react'

export const Commits = ({ commits }) => {
  return (
    <>
      <ul>
        {commits.map((commit, i) => (
          <li key={commit.sha}>Commit {commit.commit.message}</li>
        ))}
      </ul>
    </>
  )
}
