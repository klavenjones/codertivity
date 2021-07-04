import React from 'react'
import {
  fetchBranches,
  fetchCommits,
  fetchIssues,
  fetchPulls,
  fetchContributors
} from '../../lib/octokit'

import { Commits, Branches, Issues, Pulls, Contributors } from './'


export const Repo = ({ repo }) => {
  const [commits, setCommits] = React.useState(null)
  const [branches, setBranches] = React.useState(null)
  const [issues, setIssues] = React.useState(null)
  const [pulls, setPulls] = React.useState(null)
  const [contributors, setContributors] = React.useState(null)

  const getCommits = async () => {
    try {
      const commitData = await fetchCommits(repo)
      setCommits(commitData)
    } catch (error) {
      console.log(error)
    }
  }
  const getBranches = async () => {
    try {
      const branchData = await fetchBranches(repo)
      setBranches(branchData)
    } catch (error) {
      console.log(error)
    }
  }
  const getIssues = async () => {
    try {
      const issueData = await fetchIssues(repo)
      setIssues(issueData)
    } catch (error) {
      console.log(error)
    }
  }

  const getContributors = async () => {
    try {
      const contributorData = await fetchContributors(repo)
      setContributors(contributorData)
    } catch (error) {
      console.log(error)
    }
  }

  const getPulls = async () => {
    try {
      const pullData = await fetchPulls(repo)
      setPulls(pullData)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(async () => {
    try {
      getCommits()
      getBranches()
      getIssues()
    } catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(async () => {
    console.log('FIRED', repo)
    try {
      getCommits()
      getBranches()
      getIssues()
      getPulls()
      getContributors()
    } catch (error) {
      console.log(error)
    }
  }, [repo])

  return (
    <div>
      <h1>{repo.data.name}</h1>
      {commits && <Commits commits={commits.data} />}
      {branches && <Branches branches={branches.data} />}
      {issues && <Issues issues={issues.data} />}
      {contributors && <Contributors contributors={contributors.data} />}
      {pulls && <Pulls pulls={pulls.data} />}
    </div>
  )
}
