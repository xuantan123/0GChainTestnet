const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying ZetaFarm contract...");

    const ZetaFarm = await ethers.getContractFactory("ZetaFarm");

    const CAKE_ADDRESS = "0x92f0656Bb0CE869F39d91E9E12419d6255bf5507"; 

    const BURN_ADMIN_ADDRESS = "0x641DEa2c82c1114E84E28B8B0A7222c5b34E696B";  

    const zetaFarm = await ZetaFarm.deploy(CAKE_ADDRESS, BURN_ADMIN_ADDRESS);
    await zetaFarm.deployed();

    console.log(`ZetaFarm deployed at: ${zetaFarm.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
