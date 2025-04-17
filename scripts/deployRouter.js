const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); 
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const factory = "0x28a8593736FE070cac682617D00EA49D008dC19a";
  const WA0GIAddress = "0x493ea9950586033ea8894b5e684bb4df6979a0d3"; 

  const t0GDEXSwapRouter = await hre.ethers.getContractFactory("t0GDEXSwapRouter");
  const router = await t0GDEXSwapRouter.deploy(factory, WA0GIAddress);
  await router.deployed();
  console.log("Router deployed at:", router.address);

  const t0GDEXToken = await hre.ethers.getContractFactory("t0GDEXworld");
  const token = await t0GDEXToken.deploy(deployer.address);
  await token.deployed();
  console.log("Token deployed at:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run scripts/deployRouter.js --network ZeroGravityChain