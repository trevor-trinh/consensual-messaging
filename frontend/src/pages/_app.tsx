import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { Toaster } from 'react-hot-toast'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'
import { Player } from '@/types'

const chains = [sepolia]
const projectId = 'c7e93f07bce83658ef0667c21231faa2'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const socket = io('localhost:3001')

export default function App({ Component, pageProps }: AppProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    // function onConnect() {
    //   setIsConnected(true)
    // }

    // function onDisconnect() {
    //   setIsConnected(false)
    // }

    function onChangePlayers(players: Player[]) {
      console.log('changing players')
      console.log(players)
      setPlayers(players)
    }

    const onGameStart = () => setGameStarted(true)

    // socket.on('connect', onConnect)
    // socket.on('disconnect', onDisconnect)
    socket.on('details', onChangePlayers)
    socket.on('startGame', onGameStart)

    return () => {
      // socket.off('connect', onConnect)
      // socket.off('disconnect', onDisconnect)
      socket.off('details', onChangePlayers)
      socket.off('startGame', onGameStart)
    }
  }, [])

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider>
          <Component
            {...pageProps}
            socket={socket}
            people={players}
            gameStarted={gameStarted}
          />
        </ChakraProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <Toaster />
    </>
  )
}
