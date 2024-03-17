import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  NftSubdomain: p.createTable({
    id: p.bigint(),
    registeredAt: p.bigint(),
    domainId: p.int(),
    name: p.string(),
    keys: p.string(),
    coinTypes: p.string(),
  }),
}));
