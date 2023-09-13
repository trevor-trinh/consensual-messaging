import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("ConsensualMessaging", [
    "0xded711f5ad11c791769f545a4e13b2df228a92dd",
    "0x33d7a40be8382f82b6cec56aaaa9e6929d745825",
    "0x4e51328d18e0ca994e94b41886413023551da1a3f44dc20294b6214aa5bdb4b2",
    "0xb3146708fa0b215994086d708e4a52b21935dd6dbf28d20e530332f5294b16ea",
  ]);

  await lock.waitForDeployment();

  console.log(`Deployed to ${lock.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
