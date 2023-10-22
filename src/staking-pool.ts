import { DepositToPool as DepositToPoolEvent } from "../generated/templates/StakingPool/StakingPool";
import { DepositToPool } from "../generated/schema";

export function handleDepositToPool(event: DepositToPoolEvent): void {
  let entity = new DepositToPool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.amount = event.params.amount;
  entity.depositer = event.params.depositer;
  entity.StakingPool_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
