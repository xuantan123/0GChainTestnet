const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying Staking Contract with account: ${deployer.address}`);

  const tokenAddress = "0x92f0656Bb0CE869F39d91E9E12419d6255bf5507"; // CAKE token
  const masterchefV2Address = "0x2d5a778d313E3CbC2Db0B30451F37350bF131D69"; // Địa chỉ Farm
  const adminAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B";
  const treasuryAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B"; // Cùng admin
  const operatorAddress = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B"; // Cùng admin
  const pid = 1;

  // Deploy contract Staking
  const StakingContract = await ethers.getContractFactory("ZetaPool");
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
