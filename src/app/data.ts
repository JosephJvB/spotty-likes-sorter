import { ISpotifyPlaylistTrack } from 'jvb-spotty-models'

export const MyLikes = [
  /**
   * last 20 likes used to restore state after i broke it
   * grab ya latest 20 likes from spotify again if you wanna use it
   */
  // '5rO40jEetaPNDTzHSvGzVz',
  // '0NH4E6UL2DUGMBtvsylm1O',
  // '6ZMWWTQseIk2VYzcsdBAhd',
  // '1BViPjTT585XAhkUUrkts0',
  // '27rgTetikreqkvedaxrF5N',
  // '52GJf3163rfoCtjOvCe85K',
  // '55Cp1NZP8tDRDgKF2RTEew',
  // '3LlQyxWlsx8y4rZtkETUjl',
  // '1UHS8Rf6h5Ar3CDWRd3wjF',
  // '2mJI78wsFOQfLvrrlR0H3H',
  // '1zYuc5YFYlFfSSq6IslHVY',
  // '0NyJ7MxE68laCQ1rI5V6rb',
  // '5gt61IZfHsjowiK4QX1Hc7',
  // '6LhSsOUN9BRqiXKfGBkNp6',
  // '6zyFMERNIyF0EDEVPC9Ck8',
  // '25lJGQuHWeFhYt7ffpF2xz',
  // '2CcH3jT1sLd06JU4VVBTq9',
  // '6vKvFFPdgQ6um4y3Fj40OK',
  // '0hwVwvdbBpxff1EBzmHLXz',
  // '26b3oVLrRUaaybJulow9kz',
]

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
