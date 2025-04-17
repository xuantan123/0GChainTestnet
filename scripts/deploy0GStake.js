const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying Staking Contract with account: ${deployer.address}`);

  const tokenAddress = "0xF597cE99bc20F6cBe752982dB362B78B84b5690C"; // token 0GDEX
  const masterchefV2Address = "0x4d4812CA33e31761c60b7f9d4c7a7C2d39f4868B"; // Địa chỉ Farm
  const adminAddress = "0x1c6261b5Bc54f42D3B0e6bf74c052C3917cAb29C";
  const treasuryAddress = "0x1c6261b5Bc54f42D3B0e6bf74c052C3917cAb29C"; // Cùng admin
  const operatorAddress = "0x1c6261b5Bc54f42D3B0e6bf74c052C3917cAb29C"; // Cùng admin
  const pid = 1;

  // Deploy contract Staking
  const StakingContract = await ethers.getContractFactory("t0GDEXPool");
  const staking = await StakingContract.deploy(
    tokenAddress,
    masterchefV2Address,
    adminAddress,
    treasuryAddress,
    operatorAddress,
    pid
  );

  await staking.deployed();
  console.log(`✅ Staking Contract deployed at: ${staking.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //   npx hardhat run scripts/deploy0GStake.js --network ZeroGravityChain