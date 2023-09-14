import Layout from '@/components/Layout'
import { Player } from '@/types'
import { Text, Button, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Lobby(props: any) {
  const router = useRouter()
  const { socket, people, gameStarted } = props
  const { name, room } = router.query

  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }

    if (gameStarted) {
      router.push({
        pathname: '/game',
        query: { name, room },
      })
    }
  }, [gameStarted])

  // console.log(people)

  const handleStart = () => {
    socket.emit('startGame', room)
  }

  return (
    <Layout>
      <Text>Hello {name}!</Text>
      <Text fontSize={'4xl'}>{room}</Text>
      <UnorderedList>
        {people.map((person: Player) => (
          <ListItem>{person.name}</ListItem>
        ))}
      </UnorderedList>
      <Button w="xs" onClick={handleStart}>
        Start
      </Button>
    </Layout>
  )
}
