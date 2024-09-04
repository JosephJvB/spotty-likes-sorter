import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Cookies, deleteCookie, setCookie } from '../util'

export const TokenSetter: React.FC = () => {
  const trySetToken = async () => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (!code) {
      return
    }

    const response = await fetch(`/api/token?code=${code}`)
    const data: { access_token: string; expires_in: number } =
      await response.json()

    if (!response.ok) {
      console.error('failed to get token', data)
      deleteCookie(Cookies.spottyAuth)
      return
    }

    setCookie(Cookies.spottyAuth, data.access_token, data.expires_in)
  }

  useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      await trySetToken()
      window.location.href = window.location.origin
      return true
    },
  })

  return <p>pls wait x</p>
}
