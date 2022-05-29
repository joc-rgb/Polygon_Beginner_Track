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
  const GoalToken = await hre.ethers.getContractFactory("GoalToken");
  const goalToken = await GoalToken.deploy();

  await goalToken.deployed();

  console.log("Goal Token deployed to:", goalToken.address);
}

//address: https://mumbai.polygonscan.com/address/0xf360bd0580cEb83261e386dAFC5c45245eC82f14#code

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
