export const Cookies = {
  spottyAuth: 'jvb-spotty-auth',
}

export const getCookieByName = (name: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const [cookieName, value] = cookie.split('=')
    if (cookieName === name) {
      return value
    }
  }
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`
}

export const setCookie = (name: string, content: string, maxAge: number) => {
  document.cookie = `${name}=${content}; Max-Age=${maxAge}; path=/; Secure; SameSite=Strict`
}
