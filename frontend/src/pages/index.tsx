import { useRouter } from 'next/router'
import { Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { useAccount } from 'wagmi'

export default function Home(props: any) {
  const router = useRouter()
  const [name, setName] = useState('')
  const { socket } = props
  const { address, isConnecting, isDisconnected } = useAccount()

  const validate = () => {
    if (!name) {
      alert('Please enter your name')
      return false
    } else if (isConnecting || isDisconnected) {
      alert('Please connect your wallet')
      return false
    }
    return true
  }

  const handleJoin = () => {
    if (!validate()) {
      return
    }

    router.push({ pathname: '/join', query: { name } })
  }

  const handleCreate = () => {
    if (!validate()) {
      return
    }

    const code = [...Array(6)]
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('')

    socket.emit('create', name, address, code, () => {
      router.push({ pathname: '/lobby', query: { name, room: code } })
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
