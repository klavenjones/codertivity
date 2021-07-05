import querystring from 'querystring'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'
const NEW_RELEASES_ENDPOINT =
  'https://api.spotify.com/v1/browse/new-releases?limit=10'
const FEATURED_ENDPOINT = 'https://api.spotify.com/v1/browse/featured-playlists'
const SEARCH_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/search'

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  })

  return response.json()
}

export const getTopTracks = async () => {
  try {
    const { access_token } = await getAccessToken()
    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  } catch (error) {
    console.log('ERROR', error.message)
  }
}

export const getNewReleases = async () => {
  try {
    const { access_token } = await getAccessToken()
    return fetch(NEW_RELEASES_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  } catch (error) {
    console.log('ERROR', error.message)
  }
}

export const getFeaturedPlaylists = async () => {
  try {
    const { access_token } = await getAccessToken()
    return fetch(FEATURED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
  } catch (error) {
    console.log('ERROR', error.message)
  }
}

export const searchTracks = async (term) => {
  try {
    const { access_token } = await getAccessToken()
    return fetch(
      `${SEARCH_TRACKS_ENDPOINT}?limit=15&type=track,album&q=${term}`,
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    )
  } catch (error) {
    console.log('ERROR', error.message)
  }
}
