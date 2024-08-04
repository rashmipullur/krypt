const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("TransactionsModule", (m) => {
  // const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  // const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  // const deployer = m.getAccount(0);
  // const owner = m.getAccount(1);

  const Transactions = m.contract("Transactions");

  return { Transactions };
});

// ./scripts/deploy.js
// const main = async () => {
//   const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
//   const transactionsContract = await transactionsFactory.deploy();

//   await transactionsContract.deployed();

//   console.log("Transactions address: ", transactionsContract.address);
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
//   };

//   runMain();

// [ TransactionsModule ] successfully deployed 🚀

// Deployed Addresses

// TransactionsModule#Transactions - 0x85E5fBC72ce2FE10304fC247D03650d0b8d5845f
