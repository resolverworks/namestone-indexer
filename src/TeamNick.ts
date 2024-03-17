import { ponder } from "@/generated";

ponder.on("TeamNick:Registered", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  // const { node, name, owner, addr, avatar } = event.args;
  const node = event.args.node;
  const name = event.args.name;

  await NftSubdomain.create({
    id: node,
    data: {
      name: name,
      keys: "[avatar]",
      domainId: 1,
      coinTypes: "[]",
      registeredAt: event.block.timestamp,
    },
  });
});
