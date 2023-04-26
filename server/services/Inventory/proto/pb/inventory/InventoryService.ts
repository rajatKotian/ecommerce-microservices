// Original file: server/services/Inventory/proto/services/inventory/v1/inventory.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetInventoryRequest as _inventory_GetInventoryRequest, GetInventoryRequest__Output as _inventory_GetInventoryRequest__Output } from '../inventory/GetInventoryRequest';
import type { GetInventoryResponse as _inventory_GetInventoryResponse, GetInventoryResponse__Output as _inventory_GetInventoryResponse__Output } from '../inventory/GetInventoryResponse';

export interface InventoryServiceClient extends grpc.Client {
  GetInventory(argument: _inventory_GetInventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  GetInventory(argument: _inventory_GetInventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  GetInventory(argument: _inventory_GetInventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  GetInventory(argument: _inventory_GetInventoryRequest, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  getInventory(argument: _inventory_GetInventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  getInventory(argument: _inventory_GetInventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  getInventory(argument: _inventory_GetInventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  getInventory(argument: _inventory_GetInventoryRequest, callback: grpc.requestCallback<_inventory_GetInventoryResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface InventoryServiceHandlers extends grpc.UntypedServiceImplementation {
  GetInventory: grpc.handleUnaryCall<_inventory_GetInventoryRequest__Output, _inventory_GetInventoryResponse>;
  
}

export interface InventoryServiceDefinition extends grpc.ServiceDefinition {
  GetInventory: MethodDefinition<_inventory_GetInventoryRequest, _inventory_GetInventoryResponse, _inventory_GetInventoryRequest__Output, _inventory_GetInventoryResponse__Output>
}
