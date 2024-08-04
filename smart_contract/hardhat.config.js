require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ignition-ethers");

// /** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/XTaRMZ78sLTTeZ1FZRUxVE8AKgWThwxm",
      accounts: ['103795d2e75f47464262ead3d82c0f83f2d4dc96b996be56b71381abe97281e2']
    },
  },
  ignition: {
    requiredConfirmations: 1
  },
};

// https://eth-sepolia.g.alchemy.com/v2/XTaRMZ78sLTTeZ1FZRUxVE8AKgWThwxm
