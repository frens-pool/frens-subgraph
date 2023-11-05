import { dataSource } from "@graphprotocol/graph-ts";
import { DepositToPool as DepositToPoolEvent } from "../generated/templates/StakingPool/StakingPool";
import { DepositToPool } from "../generated/schema";

export function handleDepositToPool(event: DepositToPoolEvent): void {
  let context = dataSource.context();
  let poolAddress = context.getBytes("poolAddress");
  let poolId = context.getBytes("poolId");

  let entity = new DepositToPool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.pool = poolId;
  entity.amount = event.params.amount;
  entity.depositer = event.params.depositer;
  entity.nftId = event.params.id;
  entity.poolAddress = poolAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
