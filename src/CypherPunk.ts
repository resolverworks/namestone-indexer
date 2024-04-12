import { ponder } from "@/generated";

ponder.on("CypherPunk:Registered", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  const tokenId = event.args.token;
  const name = event.args.name;
  const addr = event.args.owner;

  await NftSubdomain.create({
    id: tokenId,
    data: {
      tokenId: tokenId,
      name: name,
      address: addr,
      textRecords: `{"avatar":"https://imagedelivery.net/UJ5oN2ajUBrk2SVxlns2Aw/1f2016ba-f414-4ec0-80c8-d02d5e694d00/public","description":"","location":"","com.twitter":"","url":""}`,
      domainName: "cu-cypherpunk.eth",
      coinTypes: "{}",
      registeredAt: event.block.timestamp,
    },
  });
});

ponder.on("CypherPunk:Transfer", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  const tokenId = event.args.tokenId;
  const addr = event.args.to;
  try {
    await NftSubdomain.update({
      id: tokenId,
      data: {
        tokenId: tokenId,
        address: addr,
      },
    });
  } catch (e) {
    // If the update fails, the profile doesn't yet exist in the database which means it's a registration
    // We can ignore the Transfer event in this case because it is covered by the `TeamNick:Registered` handler
  }
});

ponder.on("CypherPunk:TextChanged", async ({ event, context }) => {
  const { NftSubdomain } = context.db;
  const tokenId = event.args.token;
  const key = event.args.key;
  const value = event.args.value;

  await NftSubdomain.update({
    id: tokenId,
    data: ({ current }) => {
      const textRecords = JSON.parse(current.textRecords);
      textRecords[key] = value;
      return {
        textRecords: JSON.stringify(textRecords),
      };
    },
  });
});
