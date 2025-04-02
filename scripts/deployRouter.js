const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); 
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const factory = "0x7FDc996385baEB9aD972C99d1756DC6ab057E2de";
  const WA0GIAddress = "0x493ea9950586033ea8894b5e684bb4df6979a0d3"; 

  const ZeroGravitySwapRouter = await hre.ethers.getContractFactory("DaiKoDexRouter");
  const router = await ZeroGravitySwapRouter.deploy(factory, WA0GIAddress);
  await router.deployed();
  console.log("Router deployed at:", router.address);

  const ZeroGravityToken = await hre.ethers.getContractFactory("ZeroGravityworld");
  const token = await ZeroGravityToken.deploy(deployer.address);
  await token.deployed();
  console.log("Token deployed at:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
