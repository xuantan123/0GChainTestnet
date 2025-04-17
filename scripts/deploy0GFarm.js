const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying t0GDEXFarm contract...");

    const ZeroGravityFarm = await ethers.getContractFactory("t0GDEXFarm");

    const CAKE_ADDRESS = "0xF597cE99bc20F6cBe752982dB362B78B84b5690C"; //0GDEX

    const BURN_ADMIN_ADDRESS = "0x1c6261b5Bc54f42D3B0e6bf74c052C3917cAb29C";  //A0GI

    const zeroGravityFarm = await ZeroGravityFarm.deploy(CAKE_ADDRESS, BURN_ADMIN_ADDRESS);
    await zeroGravityFarm.deployed();

    console.log(`0GFarm deployed at: ${zeroGravityFarm.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
// npx hardhat run scripts/deploy0GFarm.js --network ZeroGravityChain