import Layout from '@/components/Layout'
import { Text, Button, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Lobby(props: any) {
  const router = useRouter()
  const { socket } = props
  const { name, room } = router.query
  const [people, setPeople] = useState([])

  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }
    console.log(room)
    socket.emit('fetchusers', room, (people: any) => setPeople(people))
  }, [setPeople])
  console.log(people)
  const handleStart = () => {
    router.push({
      pathname: '/game',
      query: { name, room },
    })
  }

  return (
    <Layout>
      <Text>Hello {name}!</Text>
      <Text fontSize={'4xl'}>{room}</Text>
      <UnorderedList>
        {people.map((person: any) => (
          <ListItem>{person.name}</ListItem>
        ))}
      </UnorderedList>
      <Button w="xs" onClick={handleStart}>
        Start
      </Button>
    </Layout>
  )
}
