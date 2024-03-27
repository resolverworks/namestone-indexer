import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  NftSubdomain: p.createTable({
    id: p.bigint(),
    tokenId: p.bigint(),
    registeredAt: p.bigint(),
    domainName: p.string(),
    name: p.string(),
    keys: p.string(),
    coinTypes: p.string(),
    address: p.string(),
  }),
}));
