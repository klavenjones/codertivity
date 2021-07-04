import React from 'react'
import { fetchRepo } from '../lib/octokit'
import { Repo } from '../components/github'
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/client'
import styles from '../styles/Home.module.css'
import { Tasks } from '../components/tasks/tasks'

export default function Home() {
  const [session, loading] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return <h1>Loading</h1>

  if (!session) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <main className='w-full h-screen flex flex-col items-center justify-center space-y-4'>
          <h1>Not Logged In</h1>
          <button
            className='border-2 p-2'
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign in
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <main className='w-full h-screen flex items-center justify-center'>
        <h1>Logged In</h1>
        {console.log('SESSION', session)}
        <button
          className='border-2 p-2'
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign Out
        </button>
      </main>
    </div>
  )
}
