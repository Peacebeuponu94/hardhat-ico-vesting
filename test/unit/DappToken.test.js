const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
require("chai").should()

// If not on a development chain
!developmentChains.includes(network.name)
  ? describe.skip // skip this test, otherwise...
  : describe("DappToken Unit Tests", async function () {
      let deployer, DappToken

      beforeEach(async function () {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture("dapptoken")
        DappToken = await ethers.getContract("DappToken")
      })
      describe("Deploy", function () {
        it("initializes with correct name and symbol", async function () {
          const name = await DappToken.name()
          const symbol = await DappToken.symbol()
          name.should.equal("DappToken")
          symbol.should.equal("DT")
        })
        it("initializes with the correct decimals", async function () {
          const decimals = await DappToken.decimals()
          decimals.should.equal(ethers.BigNumber.from(18))
        })
        it("decimals don't require BigNumber", async function () {
          const decimals = await DappToken.decimals()
          decimals.should.equal(18)
        })
      })
      describe("Functions", function () {
        it("Total Supply starts at 0", async function () {
          const totalSupply = await DappToken.totalSupply()
          totalSupply.should.equal(0)
        })
        it("Mint adds to Total Supply", async function () {
          const afterMint = await DappToken.mint(deployer.address, 2)
          const totalSupply = await DappToken.totalSupply()
          totalSupply.should.equal(2)
        })
      })

      // describe("Mint NFT", () => {
      //   beforeEach(async () => {
      //     const transactionResponse = await BasicNft.mintNft()
      //     await transactionResponse.wait(1)
      //   })
      //   it("updates tokenCounter and tokenURI", async function () {
      //     const tokenCounter = await BasicNft.getTokenCounter()
      //     const tokenURI = await BasicNft.tokenURI(0)
      //     assert.equal(tokenCounter.toString(), "1")
      //     assert.equal(tokenURI.toString(), await BasicNft.TOKEN_URI())
      //   })
      //   it("Shows the correct balance and owner of an NFT", async function () {
      //     const deployerAddress = deployer.address
      //     const deployerBalance = await BasicNft.balanceOf(deployerAddress)
      //     // Maybe someday I'll figure out how to make this work
      //     //   const owner = await BasicNft.ownerOf("1")

      //     assert.equal(deployerBalance.toString(), "1")
      //     // assert.equal(owner, deployerAddress)
      //   })
      // })
    })
