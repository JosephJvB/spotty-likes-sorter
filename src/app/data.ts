import { ISpotifyPlaylistTrack } from 'jvb-spotty-models'

export const TestLikes: ISpotifyPlaylistTrack[] = Array(20)
  .fill(0)
  .map(
    (_, idx) =>
      ({
        added_at: (Date.now() - Math.random() * 10000).toString(),
        track: {
          album: {},
          artists: [
            {
              name: `artist ${idx}`,
            },
          ],
          available_markets: [''],
          disc_number: 0,
          duration_ms: 0,
          explicit: true,
          external_ids: {},
          external_urls: {
            spotify: '',
          },
          href: '',
          id: `id_${idx}`,
          is_local: true,
          name: `song title ${idx}`,
          popularity: 0,
          preview_url: '',
          track_number: 0,
          type: '',
          uri: '',
        },
      } as ISpotifyPlaylistTrack)
  )
