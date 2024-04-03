import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  NftSubdomain: p.createTable({
    id: p.bigint(),
    tokenId: p.bigint(),
    registeredAt: p.bigint().optional(),
    domainName: p.string().optional(),
    name: p.string().optional(),
    textRecords: p.string(),
    coinTypes: p.string(),
    address: p.string(),
  }),
}));
