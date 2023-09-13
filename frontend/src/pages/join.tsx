import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Text, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Join() {
  const router = useRouter()
  const [code, setCode] = useState('')

  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }
  }, [])

  const handleJoin = () => {
    router.push({ pathname: '/lobby', query: { name: router.query.name } })
  }

  return (
    <Layout>
      <Text>Hello {router.query.name}!</Text>
      <Input
        maxW={'xs'}
        placeholder="Enter room code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button w="xs" onClick={handleJoin}>
        Join Lobby
      </Button>
    </Layout>
  )
}
