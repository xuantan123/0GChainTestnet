const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZetaStake Contract", function () {
    let ZetaStake, zetaStake, token;
    let owner, user1;

    before(async function () {
        [owner, user1] = await ethers.getSigners();

        // Deploy a mock token for staking
        const MockToken = await ethers.getContractFactory("MockToken");
        token = await MockToken.deploy("Mock Token", "MTK", ethers.utils.parseEther("1000000"));
        await token.deployed();

        // Deploy ZetaStake contract
        ZetaStake = await ethers.getContractFactory("ZetaStake");
        zetaStake = await ZetaStake.deploy(token.address, /* other parameters */);
        await zetaStake.deployed();
    });

    it("should allow users to deposit tokens", async function () {
        // User1 approves and deposits tokens
        await token.approve(zetaStake.address, ethers.utils.parseEther("100"));
        await zetaStake.deposit(ethers.utils.parseEther("100"));

        const userInfo = await zetaStake.userInfo(user1.address);
        expect(userInfo.amount).to.equal(ethers.utils.parseEther("100"));
    });

    it("should allow users to withdraw tokens", async function () {
        await zetaStake.withdraw(ethers.utils.parseEther("50"));

        const userInfo = await zetaStake.userInfo(user1.address);
        expect(userInfo.amount).to.equal(ethers.utils.parseEther("50"));
    });

    it("should calculate pending rewards correctly", async function () {
        // Simulate some time passing
        await ethers.provider.send("evm_increaseTime", [3600]); // Increase time by 1 hour
        await ethers.provider.send("evm_mine"); // Mine a new block

        const pendingRewards = await zetaStake.pendingRewards(user1.address);
        expect(pendingRewards).to.be.gt(0); // Check that there are pending rewards
    });

    it("should allow emergency withdraw", async function () {
        await zetaStake.emergencyWithdraw();

        const userInfo = await zetaStake.userInfo(user1.address);
        expect(userInfo.amount).to.equal(0);
    });
}); 