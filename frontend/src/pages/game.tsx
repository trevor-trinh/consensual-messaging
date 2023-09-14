import Layout from '@/components/Layout'
import {
  Card,
  Text,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Player } from '@/types'
import SignalButton from '@/components/SignalButton'
import { useAccount } from 'wagmi'

export default function Game(props: any) {
  const router = useRouter()
  const { people } = props

  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const { address, isConnecting, isDisconnected } = useAccount()

  // timer for round to end
  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     router.push('/results')
  //   }
  //   const timeoutId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
  //   return () => clearTimeout(timeoutId)
  // }, [timeLeft])

  // gets the list of names+addresses from backend
  const { socket } = props

  // useEffect(() => {
  //   // fetch('/api/game')
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     setPlayers(data)
  //   //   })
  //   setPlayers([
  //     { name: 'player1', address: '0x123' },
  //     {
  //       name: 'player2',
  //       address: '0x456',
  //     },
  //   ])
  // }, [])

  // could listen to events starting here
  // then when something happens just pass it to the next screen

  return (
    <Layout>
      <Text fontSize={'3xl'}>Send a signal!</Text>
      <Text>{timeLeft}s</Text>
      <Wrap spacing={6}>
        {people &&
          people
            .filter((player: any) => player.address !== address)
            .map((player: any) => (
              <WrapItem key={player.name}>
                <Card textAlign={'center'} w={'3xs'} alignItems={'center'}>
                  <CardHeader pb={0}>
                    <Heading size="md" noOfLines={1} maxW={'3xs'}>
                      {player.name}
                    </Heading>
                  </CardHeader>
                  <CardBody pb={0} noOfLines={1} maxW={'3xs'}>
                    <Text>{player.address}</Text>
                  </CardBody>
                  <CardFooter>
                    <SignalButton
                      player={player}
                      selectedPlayer={selectedPlayer}
                      setSelectedPlayer={setSelectedPlayer}
                    />
                  </CardFooter>
                </Card>
              </WrapItem>
            ))}
      </Wrap>
    </Layout>
  )
}
