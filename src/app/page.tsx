import { List } from './list'
import { Cookies } from './util'
import { getStartUrl } from './spotifyClient'
import { Login } from './login'
import { cookies } from 'next/headers'
import { QueryWrapper } from './query-wrapper'

/**
 *
 * TODO: handle server / client proper idk what I'm doing at all
 */

export default function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(Cookies.spottyAuth)?.value
  const startUrl = getStartUrl()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* nextjs didn't want this shit on the server ay */}
      <QueryWrapper>
        {accessToken && <List />}
        {!accessToken && <Login url={startUrl} />}
      </QueryWrapper>
    </main>
  )
}
