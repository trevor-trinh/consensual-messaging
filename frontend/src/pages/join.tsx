import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Text, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Join(props: any) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const { socket } = props

  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }
  }, [])

  const handleJoin = () => {
    socket.emit('join', router.query.name, code, (response: any) => {
      router.push({ pathname: '/lobby', query: { name: router.query.name } })
    })
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
