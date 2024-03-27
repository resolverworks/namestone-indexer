import { createConfig } from "@ponder/core";
import { http } from "viem";

import { TeamNick } from "./abis/TeamNick";
import { CypherPunk } from "./abis/CypherPunk";

export default createConfig({
  networks: {
    base: {
      chainId: 8453,
      transport: http(
        process.env.PONDER_RPC_URL_8453 || "https://base.llamarpc.com"
      ),
    },
    abitrumsepolia: {
      chainId: 421614,
      transport: http(
        process.env.PONDER_RPC_URL_421614 ||
          "https://sepolia-rollup.arbitrum.io/rpc	"
      ),
    },
  },
  contracts: {
    TeamNick: {
      network: "base",
      address: "0x7C6EfCb602BC88794390A0d74c75ad2f1249A17f",
      abi: TeamNick,
      startBlock: 7128431,
    },
    CypherPunk: {
      network: "abitrumsepolia",
      address: "0xdfc5bb5032889BABA9157CAD26C79ceC740D7528",
      abi: CypherPunk,
      startBlock: 7625455,
    },
  },
});
