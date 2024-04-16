import { ponder } from "@/generated";

ponder.on("TeamNick:Registered", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  const node = event.args.node;
  const name = event.args.name;
  const addr = event.args.addr;
  const owner = event.args.owner;
  const avatar = event.args.avatar;

  await NftSubdomain.create({
    id: node,
    data: {
      tokenId: node,
      name: name,
      address: addr,
      owner: owner,
      textRecords: '{avatar: "' + avatar + '"}',
      domainName: "teamnick.xyz",
      coinTypes: "[]",
      registeredAt: event.block.timestamp,
    },
  });
});

ponder.on("TeamNick:AddressChanged", async ({ context, event }) => {
  const { NftSubdomain } = context.db;
  const node = event.args.node;
  const addr = event.args.addr;
  try {
    await NftSubdomain.update({
      id: node,
      data: {
        address: addr,
      },
    });
  } catch (e) {}
});

ponder.on("TeamNick:AvatarChanged", async ({ context, event }) => {
  const { NftSubdomain } = context.db;
  const node = event.args.node;
  const avatar = event.args.avatar;

  try {
    await NftSubdomain.update({
      id: node,
      data: {
        textRecords: '{avatar: "' + avatar + '"}',
      },
    });
  } catch (e) {}
});

ponder.on("TeamNick:Transfer", async ({ context, event }) => {
  const { NftSubdomain } = context.db;
  const tokenId = event.args.tokenId;
  const to = event.args.to;

  try {
    await NftSubdomain.update({
      id: tokenId,
      data: {
        owner: to,
      },
    });
  } catch {
    // If the update fails, the profile doesn't yet exist in the database which means it's a registration
    // We can ignore the Transfer event in this case because it is covered by the `TeamNick:Registered` handler
  }
});
