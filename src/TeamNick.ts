import { ponder } from "@/generated";

ponder.on("TeamNick:Registered", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  // const { node, name, owner, addr, avatar } = event.args;
  const node = event.args.node;
  const name = event.args.name;
  const addr = event.args.addr;

  await NftSubdomain.create({
    id: node,
    data: {
      name: name,
      address: addr,
      keys: "[avatar]",
      domainId: 1,
      coinTypes: "[]",
      registeredAt: event.block.timestamp,
    },
  });
});

ponder.on("TeamNick:AddressChanged", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  const node = event.args.node;
  const addr = event.args.addr;

  await NftSubdomain.update({
    id: node,
    data: {
      address: addr,
    },
  });
});
