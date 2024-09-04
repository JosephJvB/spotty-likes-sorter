'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TokenSetter } from './tokenSetter'

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        {/* had to move query stuff inside a child of queryclientprovider */}
        <TokenSetter />
      </main>
    </QueryClientProvider>
  )
}
