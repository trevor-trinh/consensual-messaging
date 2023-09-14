import { useRouter } from 'next/router'
import { Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '@/components/Layout'

export default function Home(props: any) {
  const router = useRouter()
  const [name, setName] = useState('')
  const { socket } = props

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
    const code = 'ABCDEF'
    socket.emit('create', name, '0xsomething', code, (response: any) => {
      console.log(response)
      console.log('Back from create')
      router.push({ pathname: '/lobby', query: { name, code } })
    })
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
