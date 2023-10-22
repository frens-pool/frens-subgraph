import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Create } from "../generated/StakingPoolFactory/StakingPoolFactory"

export function createCreateEvent(
  contractAddress: Address,
  creator: Address,
  owner: Address
): Create {
  let createEvent = changetype<Create>(newMockEvent())

  createEvent.parameters = new Array()

  createEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  createEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  createEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return createEvent
}
