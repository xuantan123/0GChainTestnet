const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying ZeroGravityFarm contract...");

    const ZeroGravityFarm = await ethers.getContractFactory("ZeroGravityFarm");

    const CAKE_ADDRESS = "0x2410f5541148ec6b6db8C1712E4D4E8C48D6239E"; //A0GIW

    const BURN_ADMIN_ADDRESS = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B";  //A0GI

    const zeroGravityFarm = await ZeroGravityFarm.deploy(CAKE_ADDRESS, BURN_ADMIN_ADDRESS);
    await zeroGravityFarm.deployed();

    console.log(`ZeroGravityFarm deployed at: ${zeroGravityFarm.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
