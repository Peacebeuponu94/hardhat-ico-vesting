# ERC20 ICO with Vesting schedule

Install repository using `yarn`

## Test locally

1. Open a terminal and run `yarn hardhat node`
2. On another terminal, run `yarn hardhat run scripts/deploy.js --network localhost`
3. Then run `yarn hardhat console --network localhost`
4. Connect to DappToken to be able to send commands (replace address with your address)

```
const Token = await ethers.getContractFactory("DappToken")
const token = await Token.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
```

5. Check if it's connected with `await token.name()`. It should return the token's name.

- **.toString()** helps you to display uint256 numbers (which are too big for JS).

For more information on using the console, refer to [Hardhat documentation](https://docs.openzeppelin.com/learn/deploying-and-interacting?pref=hardhat)
