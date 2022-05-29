import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import contractAddr from '../constant';
import Voting from '../Voting.json';
const Vote = ({ contract, setContract }) => {
  const [candidates, setCandidates] = useState([]);
  const [status, setStatus] = useState(false);
  const fetchCandidates = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const sign = provider.getSigner();
    const contract = new ethers.Contract(contractAddr, Voting.abi, sign);
    setContract(contract);
    console.log('fetching...');
    const res = await contract.getCandidateList();
    const sta = await contract.getStatus();
    setStatus(sta);
    let candidateList = [];
    for (let i = 0; i < res.length; i++) {
      const vote = await contract.getCandidateVote(i);
      candidateList.push({
        id: i,
        name: ethers.utils.parseBytes32String(res[i]),
        votes: vote.toString(),
      });
    }
    setCandidates(candidateList);
  };
  useEffect(() => {
    fetchCandidates();
  }, []);
  const voteCandidate = async id => {
    const res = await contract.vote(id);
    await res.wait();
    fetchCandidates();
  };
  return (
    <>
      <Text>Election is {status ? 'Open' : 'Closed'}</Text>
      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Total Votes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map(candidate => {
              return (
                <Tr key={candidate.id}>
                  <Td>{candidate.id}</Td>
                  <Td>{candidate.name}</Td>
                  <Td>{candidate.votes}</Td>
                  <Td>
                    <Button
                      colorScheme="orange"
                      onClick={() => voteCandidate(candidate.id)}
                    >
                      Vote
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Vote;
