import { DataSourceContext } from "@graphprotocol/graph-ts";
import { Create as CreateEvent } from "../generated/StakingPoolFactory/StakingPoolFactory";
import { Create } from "../generated/schema";
import { StakingPool as StakingPoolTemplate } from "../generated/templates";

export function handleCreate(event: CreateEvent): void {
  let id = event.transaction.hash.concatI32(event.logIndex.toI32());
  let pool = new Create(id);

  pool.contractAddress = event.params.contractAddress;
  pool.creator = event.params.creator;
  pool.owner = event.params.owner;
  pool.blockNumber = event.block.number;
  pool.blockTimestamp = event.block.timestamp;
  pool.transactionHash = event.transaction.hash;

  pool.save();

  let context = new DataSourceContext();
  context.setBytes("poolAddress", event.params.contractAddress);
  context.setBytes("poolId", pool.id);
  StakingPoolTemplate.createWithContext(event.params.contractAddress, context);

  // StakingPoolTemplate.create(event.params.contractAddress);
}
