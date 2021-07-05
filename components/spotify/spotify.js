import React from 'react'
import { useForm } from 'react-hook-form'

export const Spotify = () => {
  const { register, handleSubmit } = useForm()
  const [featuredTracks, setFeaturedTracks] = React.useState([])
  const [newTracks, setNewTracks] = React.useState([])
  const [searchedTracks, setSearched] = React.useState([])

  const fetchNewTracks = async () => {
    const response = await fetch('/api/spotify/new-releases')
    return await response.json()
  }

  const fetchFeatured = async () => {
    const response = await fetch('/api/spotify/featured')
    return await response.json()
  }

  const searchTracks = async (term) => {
    const response = await fetch('/api/spotify/search-tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(term)
    })
    return await response.json()
  }

  const searchTerm = async (data) => {
    const tracks = await searchTracks(data)
    setSearched(tracks.results)
  }

  React.useEffect(async () => {
    const newTracks = await fetchNewTracks()
    const featured = await fetchFeatured()
    setNewTracks(newTracks.albums)
    setFeaturedTracks(featured.playlists)
  }, [])

  return (
    <div>
      <h1>Spotify</h1>

      <div className='grid grid-cols-1 gap-5'>
        <div>
          <h1 className='text-3xl'>Search</h1>
          <input className='border' type='text' {...register('term')} />{' '}
          <button onClick={handleSubmit(searchTerm)}>Search</button>{' '}
          <ul>
            {searchedTracks &&
              searchedTracks.map((track) => (
                <li>
                  <a href={track.url}>{track.title}</a>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h1 className='text-3xl'>Featured</h1>
          <ul>
            {featuredTracks &&
              featuredTracks.map((track, i) => (
                <li key={i}>
                  <a href={track.url}>{track.name}</a>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h1 className='text-3xl'>New Tracks</h1>
          <ul>
            {newTracks &&
              newTracks.map((track, i) => (
                <li key={i}>
                  <a href={track.url}>{track.title}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
