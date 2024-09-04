import { TestLikes } from './data'
import { List } from './list'
import { cookies } from 'next/headers'
import { Cookies } from './util'
import { getStartUrl } from './spotifyClient'
import { Login } from './login'

/**
 *
 * TODO: initial render on server
 */

export default function Home() {
  const accessToken = cookies().get(Cookies.spottyAuth)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {accessToken && <List initialItems={TestLikes} />}
      {!accessToken && <Login url={getStartUrl()} />}
    </main>
  )
}
