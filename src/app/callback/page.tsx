import { TokenSetter } from './tokenSetter'
import { QueryWrapper } from '../query-wrapper'
import { redirect } from 'next/navigation'

export default function Page(props: { searchParams: Record<string, string> }) {
  if (!props.searchParams.code) {
    redirect('/')
    return
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QueryWrapper>
        <TokenSetter code={props.searchParams.code} />
      </QueryWrapper>
    </main>
  )
}
