'use client'

export const Login: React.FC<{
  url: string
}> = (props) => {
  const login = () => {
    if (typeof window === 'undefined') {
      return
    }

    window.location.href = props.url
  }

  return (
    <button
      onClick={login}
      className='px-4 py-2 bg-green-400 disabled:bg-green-200 disabled:cursor-not-allowed rounded mb-4 w-full cursor-pointer'
    >
      Login
    </button>
  )
}
