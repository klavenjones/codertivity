import { getFeaturedPlaylists } from '../../../lib/spotify'

export default async (_, res) => {
  const response = await getFeaturedPlaylists()
  const {
    playlists: { items }
  } = await response.json()
  const playlists = items.map((playlist) => ({
    name: playlist.name,
    description: playlist.description,
    url: playlist.external_urls.spotify,
    image: playlist.images[0].url
  }))

  return res.status(200).json({ playlists })
}
