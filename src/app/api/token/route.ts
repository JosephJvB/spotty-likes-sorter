import { type NextRequest } from 'next/server'
import { submitCode } from '../../spotifyClient'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  console.log('callback', { code })
  if (!code) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokenResponse = await submitCode(code)
    console.log('got token', tokenResponse)

    return Response.json(tokenResponse)
  } catch (error) {
    console.error('oopy doopy', error)

    return new Response(error?.toString() ?? 'oops!', {
      status: 400,
    })
  }
}
