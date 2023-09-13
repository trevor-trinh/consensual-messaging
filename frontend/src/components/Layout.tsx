import Header from './Header'
import { VStack, Container } from '@chakra-ui/react'

export default function Layout({ children }: { children: any }) {
  return (
    <Container maxW={'3xl'} mt={4}>
      <Header />
      <VStack mt={20} spacing={4}>
        {children}
      </VStack>
    </Container>
  )
}
