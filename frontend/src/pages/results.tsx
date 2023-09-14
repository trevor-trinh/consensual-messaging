import Layout from '@/components/Layout'
import { Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Results() {
  const router = useRouter()
  return (
    <Layout>
      <Text fontSize={'3xl'}>It's a Match!</Text>

      <Button onClick={() => router.push('/')}>Play Again</Button>
    </Layout>
  )
}
