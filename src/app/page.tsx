'use client'
import { List } from './list'
import { Cookies, getCookieByName } from './util'
import { getStartUrl } from './spotifyClient'
import { Login } from './login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()

/**
 *
 * TODO: handle server / client proper idk what I'm doing at all
 */

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    setAccessToken(getCookieByName(Cookies.spottyAuth) ?? null)
  }, [])

  const startUrl = getStartUrl()

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {accessToken && <List />}
        {!accessToken && <Login url={startUrl} />}
      </main>
    </QueryClientProvider>
  )
}
