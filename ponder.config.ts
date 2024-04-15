import { createConfig } from "@ponder/core";
import { http } from "viem";
import { rateLimit } from "@ponder/utils";

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
    abitrum: {
      chainId: 42161,
      transport: rateLimit(
        http(
          process.env.PONDER_RPC_URL_42161 || "https://arb1.arbitrum.io/rpc"
        ),
        { requestsPerSecond: 10 }
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
      network: "abitrum",
      address: "0xEC2244b547BD782FC7DeefC6d45E0B3a3cbD488d",
      abi: CypherPunk,
      startBlock: 197223053,
    },
  },
});
