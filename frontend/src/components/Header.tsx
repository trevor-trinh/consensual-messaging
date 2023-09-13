import { Web3Button } from '@web3modal/react'
import { HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Header() {
  return (
    <HStack justifyContent={'space-between'}>
      <Link href="/">ConsensualTexting</Link>
      <Web3Button />
    </HStack>
  )
}
