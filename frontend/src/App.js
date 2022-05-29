import { React, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Button,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Vote from './comps/Vote';
import ConnectWallet from './comps/ConnectWallet';

function App() {
  const [accounts, setAccount] = useState([]);
  const [contract, setContract] = useState();
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Flex>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Spacer />
            <ConnectWallet accounts={accounts} setAccounts={setAccount} />
          </Flex>
          <Heading>President Club Election 2022</Heading>

          <Vote contract={contract} setContract={setContract} />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
