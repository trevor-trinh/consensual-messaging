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
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Player } from '@/types'
import SignalButton from '@/components/SignalButton'
import { useAccount, useContractEvent } from 'wagmi'
import ConsensualMessagingJson from '@/lib/abi/ConsensualMessaging.json'

export default function Game(props: any) {
  const router = useRouter()
  const { people } = props

  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
  const [showResults, setShowResults] = useState(false)
  const [match, setMatch] = useState()

  const { address } = useAccount()

  // timer for round to end
  useEffect(() => {
    const timeoutId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timeoutId)
  }, [timeLeft])

  useContractEvent({
    address: '0x837BBE5CCb2Bf3d4a8A04cDcf9FF2d120b084cbf',
    abi: ConsensualMessagingJson.abi,
    eventName: 'MatchEvent',
    listener(log) {
      let matchedEvent = log.filter((l) => l.args.from === address)[0].args

      let fromName = people.filter(
        (p: Player) => p.address === matchedEvent.from
      )[0]
      let toName = people.filter(
        (p: Player) => p.address === matchedEvent.to
      )[0]

      console.log('from and to', fromName, toName)
      setMatch({ from: fromName, to: toName, message: 'i wuv u' })
      setShowResults(true)
    },
  })

  return (
    <Layout>
      {!showResults ? (
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
          {match ? (
            <>
              <Text fontSize={'3xl'}>It's a Match! 💞</Text>

              <VStack my={12}>
                <Text fontSize={'xl'}>
                  {match.from.name} 🔗 {match.to.name}
                </Text>
                <Text>{match?.message}</Text>
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
