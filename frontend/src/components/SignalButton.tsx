import { Player } from '@/types'
import { Button } from '@chakra-ui/react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import ConsensualMessagingJson from '@/lib/abi/ConsensualMessaging.json'
import toast from 'react-hot-toast'

type Props = {
  player: Player
  selectedPlayer?: Player
  setSelectedPlayer: (p: Player) => void
}

const TEST_ADDRESS = '0xB1153df9132490639Da29DD5BA73d5907B7ec90B'
const MESSAGE =
  '0x692077757620752c207577750000000000000000000000000000000000000000'

export default function SignalButton({
  player,
  selectedPlayer,
  setSelectedPlayer,
}: Props) {
  const { config } = usePrepareContractWrite({
    address: '0x837BBE5CCb2Bf3d4a8A04cDcf9FF2d120b084cbf',
    abi: ConsensualMessagingJson.abi,
    functionName: 'submit',
    args: [player.address, MESSAGE],
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleSubmit = (p: Player) => {
    if (p === selectedPlayer) {
      toast('we get it, you in love', { icon: '🙄' })
      return
    }

    if (selectedPlayer) {
      toast.error('what a player smh')
      return
    }

    setSelectedPlayer(p)
    write?.()
    console.log('writing', config, data)
    console.log(p)

    toast.success('signal sent!')
  }

  return (
    <Button
      colorScheme={player === selectedPlayer ? 'green' : 'gray'}
      onClick={() => handleSubmit(player)}
      disabled={!write || isLoading}
    >
      {selectedPlayer === player ? '💘' : '🏹...'}
    </Button>
  )
}
