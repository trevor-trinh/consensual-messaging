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
  Button,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MatchEvent, Player } from '@/types'
import SignalButton from '@/components/SignalButton'
import { useAccount, useContractEvent } from 'wagmi'
import ConsensualMessagingJson from '@/lib/abi/ConsensualMessaging.json'

export default function Game(props: any) {
  const router = useRouter()
  const { people } = props

  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [showResults, setShowResults] = useState(false)
  const [matches, setMatches] = useState<MatchEvent[]>([])
  const [myMatch, setMyMatch] = useState<MatchEvent>()

  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    const foundMatch = matches.find(
      (match) => match.from === address || match.to === address
    )
    setMyMatch(foundMatch)
  }, [matches, address])

  // timer for round to end
  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     setShowResults(true)
  //   }
  //   const timeoutId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
  //   return () => clearTimeout(timeoutId)
  // }, [timeLeft])

  useContractEvent({
    address: '0xeCB2Ed307793c124706993472514D8E2627D4173',
    abi: ConsensualMessagingJson.abi,
    eventName: 'MatchEvent',
    listener(log) {
      console.log(log)
      setMatches((prev) => [...prev, log[0].data])
    },
  })

  return (
    <Layout>
      {showResults ? (
        <>
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
        </>
      ) : (
        <>
          {myMatch ? (
            <>
              <Text fontSize={'3xl'}>It's a Match! 💞</Text>

              <VStack my={12}>
                <Text fontSize={'xl'}>
                  {myMatch?.from} 🔗 {myMatch?.to}
                </Text>
                <Text>{myMatch?.message}</Text>
              </VStack>
            </>
          ) : (
            <Text fontSize={'3xl'}>No matches 🥹</Text>
          )}
          <Button onClick={() => router.push('/')}>Play Again</Button>
        </>
      )}
    </Layout>
  )
}
