import { getNewReleases } from '../../../lib/spotify'

export default async (_, res) => {
  const response = await getNewReleases()
  const {
    albums: { items }
  } = await response.json()

  const albums = items
    .filter((album) => album.album_type === 'single')
    .map((album) => ({
      artist: album.artists.map((_artist) => _artist.name).join(', '),
      url: album.external_urls.spotify,
      title: album.name,
      image: album.images[0].url
    }))

  return res.status(200).json({ albums })
}
