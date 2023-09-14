import Layout from '@/components/Layout'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Game(props: any) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(30)

  const { socket } = props

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/results')
    }
    const timeoutId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timeoutId)
  }, [timeLeft])

  return (
    <Layout>
      <Text fontSize={'3xl'}>Send a signal!</Text>
      <Text>{timeLeft}s</Text>
      <Text>game place</Text>
    </Layout>
  )
}
