// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy([
    "0x457269632057616e670000000000000000000000000000000000000000000000",
    "0x4a616d657320426f6e6400000000000000000000000000000000000000000000",
    "0x53756461727368616e204e696b6b6f6c65000000000000000000000000000000",
    "0x44616e20556b6b6f000000000000000000000000000000000000000000000000",
    "0x41696e20536f6669610000000000000000000000000000000000000000000000",
  ]);

  await voting.deployed();

  console.log("Voting deployed to:", voting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
