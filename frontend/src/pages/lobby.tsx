import Layout from '@/components/Layout'
import { Text, Button, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Lobby(props: any) {
  const router = useRouter()
  const { socket } = props

  const [code, setCode] = useState('')
  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }

    socket.emit('create', router.query.name, (response: any) => {
      console.log(response)
      // TODO: You need to give me back a cdoe
    })
  }, [])

  const handleStart = () => {
    router.push({
      pathname: '/game',
      query: { name: router.query.name },
    })
  }

  return (
    <Layout>
      <Text>Hello {router.query.name}!</Text>
      <Text fontSize={'4xl'}>CODE HERE</Text>
      <UnorderedList>
        {['person1', 'person2', 'person3'].map((person) => (
          <ListItem>{person}</ListItem>
        ))}
      </UnorderedList>
      <Button w="xs" onClick={handleStart}>
        Start
      </Button>
    </Layout>
  )
}
