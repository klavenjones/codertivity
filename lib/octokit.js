import { Octokit } from '@octokit/core'

//Initialize Octokit
export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_PERSONAL_TOKEN
})

//Fetch a Repo
export const fetchRepo = async (owner, repo) => {
  try {
    return await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo
    })
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}

//Fetch issues
export const fetchIssues = async (repo) => {
  try {
    return await octokit.request(`GET ${repo.url}/issues`)
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}

//Fetch contributors
export const fetchContributors = async (repo) => {
  try {
    return await octokit.request(`GET ${repo.url}/contributors`)
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}

//Fetch Pull Requests
export const fetchPulls = async (repo) => {
  try {
    return await octokit.request(`GET ${repo.url}/pulls`)
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}

//Fetch Commits
export const fetchCommits = async (repo) => {
  try {
    return await octokit.request(`GET ${repo.url}/commits`)
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}

//Fetch Branches
export const fetchBranches = async (repo) => {
  try {
    return await octokit.request(`GET ${repo.url}/branches`)
  } catch (error) {
    return { status: error.status, message: error.message }
  }
}
