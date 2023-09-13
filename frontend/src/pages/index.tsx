import { useRouter } from 'next/router'
import { Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '@/components/Layout'

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleJoin = () => {
    if (!name) {
      alert('Please enter your name')
      return
    }
    router.push({ pathname: '/join', query: { name: name } })
  }

  const handleCreate = () => {
    if (!name) {
      alert('Please enter your name')
      return
    }
    router.push({ pathname: '/lobby', query: { name: name } })
  }

  return (
    <Layout>
      <Input
        maxW={'md'}
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Text fontSize={'6xl'}>😘</Text>
      <Button w="xs" onClick={handleJoin}>
        Play
      </Button>
      <Button w="xs" onClick={handleCreate}>
        Create
      </Button>
    </Layout>
  )
}
