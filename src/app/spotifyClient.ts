import {
  ISpotifyPaginatedResponse,
  ISpotifyPlaylistTrack,
} from 'jvb-spotty-models'
import { Cookies, getCookieByName } from './util'

/**
 * https://github.com/JosephJvB/spotty-likes-mc-chunker/blob/main/src/spotty-client.ts
 */

export const removeLikedTracks = async (trackIds: string[]) => {
  console.log('removeLikedTracks', { trackIds: trackIds.length })

  const accessToken = getCookieByName(Cookies.spottyAuth)
  if (!accessToken) {
    throw new Error('missing access token')
  }

  for (let i = 0; i < trackIds.length; i += 50) {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({
        ids: trackIds.slice(i, i + 50),
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error('failed to remove liked tracks\n' + text)
    }
  }
}

export const getLikedTracks = async () => {
  console.log('getLikedTracks')

  const accessToken = getCookieByName(Cookies.spottyAuth)
  if (!accessToken) {
    throw new Error('missing access token')
  }

  const tracks: ISpotifyPlaylistTrack[] = []
  let url = `https://api.spotify.com/v1/me/tracks`
  do {
    console.log('  >', url)
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error('failed to get liked tracks\n' + text)
    }

    const { items, next }: ISpotifyPaginatedResponse<ISpotifyPlaylistTrack> =
      await response.json()

    url = next
    tracks.push(...items)
  } while (url)

  return tracks
}

export const addToLikes = async (trackIds: string[]) => {
  console.log('addToLikes')

  const accessToken = getCookieByName(Cookies.spottyAuth)
  if (!accessToken) {
    throw new Error('missing access token')
  }

  for (let i = 0; i < trackIds.length; i += 50) {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({
        ids: trackIds.slice(i, i + 50),
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error('failed to add to liked tracks\n' + text)
    }
  }
}

export const submitCode = async (spotifyCode: string) => {
  console.log('submitCode:', spotifyCode)

  const queryParams = new URLSearchParams({
    code: spotifyCode,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_RedirectURI!,
  })

  const response = await fetch(
    `https://accounts.spotify.com/api/token?${queryParams}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SpotifyClientId}:${process.env.SpotifyClientSecret}`
        ).toString('base64')}`,
      },
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error('failed to add to submitCode\n' + text)
  }

  const data: {
    access_token: string
    expires_in: number
  } = await response.json()

  return data
}

export const getStartUrl = () =>
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SpotifyClientId!,
    scope: [
      // 'user-read-private',
      // 'user-read-email',
      // 'user-top-read',
      // 'user-read-recently-played',
      // 'playlist-read-private',
      // 'playlist-read-collaborative',
      // 'playlist-modify-private',
      // 'playlist-modify-public',
      'user-library-modify',
      'user-library-read',
    ].join(' '),
    redirect_uri: process.env.NEXT_PUBLIC_RedirectURI!,
  })
