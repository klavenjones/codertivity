import { searchTracks } from '../../../lib/spotify'

export default async (req, res) => {
  const { term } = req.body
  console.log(term)
  const response = await searchTracks(term)
  const {
    tracks: { items }
  } = await response.json()

  const results = items.map((track) => ({
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(', '),
    url: track.external_urls.spotify,
    album: track.album.name,
    type: track.type
  }))

  return res.status(200).json({ results })
}
