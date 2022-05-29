import {
  Button,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Center,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Identicon from 'react-hooks-identicons';
const ConnectWallet = ({ accounts, setAccounts }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connect = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum
          .request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
          .then(() =>
            window.ethereum.request({ method: 'eth_requestAccounts' })
          );
        setAccounts(res);
        console.log(res);
        toast({
          title: 'Connected',
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error',
          status: 'error',
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Metamask Not Found',
        status: 'warning',
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        size="md"
        m={4}
        colorScheme="green"
        fontWeight="extrabold"
        borderRadius={20}
      >
        {accounts[0] ? 'Connected✅' : 'Connect Wallet🦊'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="100%">
          <ModalHeader>
            <Center>
              <Identicon string={accounts[0]} size={50} bg="white" />
            </Center>
            <Text textAlign="center" isTruncated>
              {accounts[0] && accounts ? `${accounts[0]}` : 'Not Connected'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <ModalBody w="100%">
              <Box display="flex" flexDir="column">
                {accounts[0] ? (
                  <Button
                    w="100%"
                    onClick={() => setAccounts([])}
                    colorScheme="yellow"
                    mb={3}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    w="100%"
                    onClick={connect}
                    colorScheme="yellow"
                    mb={3}
                  >
                    Connect Wallet🦊
                  </Button>
                )}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWallet;
