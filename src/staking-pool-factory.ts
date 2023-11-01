import { DataSourceContext } from "@graphprotocol/graph-ts";
import { Create as CreateEvent } from "../generated/StakingPoolFactory/StakingPoolFactory";
import { Create } from "../generated/schema";
import { StakingPool as StakingPoolTemplate } from "../generated/templates";

export function handleCreate(event: CreateEvent): void {
  let entity = new Create(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contractAddress = event.params.contractAddress;
  entity.creator = event.params.creator;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let context = new DataSourceContext();
  context.setBytes("poolAddress", event.params.contractAddress);
  StakingPoolTemplate.createWithContext(event.params.contractAddress, context);

  // StakingPoolTemplate.create(event.params.contractAddress);
}
