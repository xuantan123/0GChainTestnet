const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying Staking Contract with account: ${deployer.address}`);

  const tokenAddress = "0x2410f5541148ec6b6db8C1712E4D4E8C48D6239E"; // CAKE token
  const masterchefV2Address = "0x474655bE1ab45499A3b0C97f7B2Ae5e07cBcD9E2"; // Địa chỉ Farm
  const adminAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B";
  const treasuryAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B"; // Cùng admin
  const operatorAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B"; // Cùng admin
  const pid = 1;

  // Deploy contract Staking
  const StakingContract = await ethers.getContractFactory("ZeroGravityPool");
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
