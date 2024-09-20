const { sumTokensExport } = require("../helper/unwrapLPs");
const sdk = require("@defillama/sdk");
const abi = require("./abi.json");


const MARKET = '0xE862Ec44481C323AEc12cc0fad626a7Ad52F74E8';
const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const STAKING_CONTRACT = '0x7DfA5FA4e8a2E284e3Dd75889ab5aa9AF92673F8';
const STAKING_COINS = ['0x54E2f1c249A6A99e616D6bFDc737b868CE85ABBa'];

module.exports = {
  methodology: "Count the ETHs in market in the Pure.Cash.",
  ethereum:{
    tvl,
    staking
  }
}

async function tvl(_, _, chainBlocks) {
  let balances = {};
  const balance = await sdk.api.abi.call({
      target: MARKET,
      params: [WETH],
      abi: abi.tokenBalances,
      chain: "ethereum",
      block: chainBlocks["ethereum"]
    });

  balances[WETH] = balance.output;
  return balances;
}

async function staking() {
  return sumTokensExport({ owner: STAKING_CONTRACT, tokens: STAKING_COINS });
}

