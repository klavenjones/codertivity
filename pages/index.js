import React from 'react'
import dynamic from 'next/dynamic'
import { fetchRepo } from '../lib/octokit'
import { Repo } from '../components/github'
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/client'
import { Tasks } from '../components/tasks'
import styles from '../styles/Home.module.css'

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
      <main className='w-full h-screen'>
        <h1>Logged In</h1>
        <button
          className='border-2 p-2'
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign Out
        </button>
        <Tasks />
      </main>
    </div>
  )
}
