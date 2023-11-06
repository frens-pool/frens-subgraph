import { dataSource } from "@graphprotocol/graph-ts";
import { DepositToPool as DepositToPoolEvent } from "../generated/templates/StakingPool/StakingPool";
import { DepositToPool, Create } from "../generated/schema";

export function handleDepositToPool(event: DepositToPoolEvent): void {
  let context = dataSource.context();
  let poolAddress = context.getBytes("poolAddress");
  let poolId = context.getBytes("poolId");

  let depositId = event.transaction.hash.concatI32(event.logIndex.toI32());
  let deposit = new DepositToPool(depositId);
  deposit.pool = poolId;
  deposit.amount = event.params.amount;
  deposit.depositer = event.params.depositer;
  deposit.nftId = event.params.id;
  deposit.poolAddress = poolAddress;
  deposit.blockNumber = event.block.number;
  deposit.blockTimestamp = event.block.timestamp;
  deposit.transactionHash = event.transaction.hash;
  deposit.save();

  // let pool = Create.load(poolId);
  // if (pool == null) {
  //   pool = new Create(poolId);
  // }
  // pool.deposits = depositId;
  // pool.save();
}
