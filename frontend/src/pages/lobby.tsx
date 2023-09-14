import Layout from '@/components/Layout'
import { Text, Button, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Lobby() {
  const router = useRouter()

  useEffect(() => {
    if (!router.query.name) {
      router.push('/')
    }
  }, [])

  const handleStart = () => {
    router.push('/game')
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
