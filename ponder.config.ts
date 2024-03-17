import { createConfig } from "@ponder/core";
import { http } from "viem";

import { TeamNick } from "./abis/TeamNick";

export default createConfig({
  networks: {
    base: {
      chainId: 8453,
      transport: http(
        process.env.PONDER_RPC_URL_8453 || "https://base.llamarpc.com"
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
  },
});
