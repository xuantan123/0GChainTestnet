const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // 📌 Lấy danh sách các contract đã deploy
    const deployments = await ethers.getSigners();
    const deployer = deployments[0];

    console.log("🚀 Đang lấy địa chỉ contract với tài khoản:", deployer.address);

    // 🏭 Lấy contract t0GDEXCall
    const t0GDEXFactory = await ethers.getContractFactory("t0GDEXFactory");

    // ⚡ Triển khai contract (hoặc lấy từ file cấu hình nếu đã deploy trước đó)
    const factory = await t0GDEXFactory.deploy(deployer.address);
    await factory.deployed();

    console.log("✅ Địa chỉ 0GFactory:", factory.address);
}

// 🚀 Chạy script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Lỗi:", error.message);
        process.exit(1);
    });


// npx hardhat run scripts/get0GFactory.js --network ZeroGravityChain