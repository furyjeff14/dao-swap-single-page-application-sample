import { ethers } from "ethers";

//Code snip is from my dapp project
let PriceCheckSample = async function () {
  const router = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
  const Wana = "0x339C72829AB7DD45C3C52f965E7ABe358dd8761E";
  const Busd = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  var routerContract = new ethers.Contract(
    router,
    [
      "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
      "function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)",
    ],
    provider
  );

  var wanaBusd = [Wana, Busd];

  const amounts = await routerContract.getAmountsOut(amountInput, wanaBusd); //Price of pair per BUSD, we can also substitute this to a non-stablecoin token

  console.log("Wana per 1 BUSD : " + amounts[1]); //104 wana per 1 busd as of 04/04/2023
};
