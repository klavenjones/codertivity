import React from 'react'
import { fetchRepo } from '../lib/octokit'
import { Repo } from '../components/github'
import { useForm } from 'react-hook-form'
import styles from '../styles/Home.module.css'

export default function Github() {
  const [repo, setRepo] = React.useState(null)

  const [error, setError] = React.useState({
    active: false,
    type: 200,
    message: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const { owner, repo } = data
    const repoData = await fetchRepo(owner, repo)
    if (repoData.status === 404) {
      setError({
        active: true,
        type: repoData.status,
        message: repoData.message
      })
      return
    }
    setRepo(repoData)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Form Input */}
        <div className='grid grid-cols-2 py-2'>
          <div>
            <input
              placeholder='Enter repo owner'
              {...register('owner', { required: true })}
            />
            {errors.owner && (
              <span className='text-red-500'>This Field is required</span>
            )}
          </div>
          <div>
            <input
              placeholder='Enter repo name'
              {...register('repo', { required: true })}
            />
            {errors.repo && (
              <span className='text-red-500'>This Field is required</span>
            )}
          </div>
          <div>
            <button className='p-4' onClick={handleSubmit(onSubmit)}>
              Submit
            </button>
          </div>
        </div>
        {/* Github */}
        {error && <h1>{error.message}</h1>}
        {repo && <Repo repo={repo} />}
      </main>
    </div>
  )
}
