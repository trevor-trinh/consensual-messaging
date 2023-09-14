import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

// console.log(process.env);

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY as string],
    },
  },
};

export default config;
