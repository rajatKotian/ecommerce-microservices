// Original file: server/services/Cart/proto/services/cart/v1/cart.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetUserRequest as _cart_GetUserRequest, GetUserRequest__Output as _cart_GetUserRequest__Output } from '../cart/GetUserRequest';
import type { GetUserResponse as _cart_GetUserResponse, GetUserResponse__Output as _cart_GetUserResponse__Output } from '../cart/GetUserResponse';

export interface CartServiceClient extends grpc.Client {
  GetCart(argument: _cart_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _cart_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _cart_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _cart_GetUserRequest, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getCart(argument: _cart_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getCart(argument: _cart_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getCart(argument: _cart_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getCart(argument: _cart_GetUserRequest, callback: grpc.requestCallback<_cart_GetUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CartServiceHandlers extends grpc.UntypedServiceImplementation {
  GetCart: grpc.handleUnaryCall<_cart_GetUserRequest__Output, _cart_GetUserResponse>;
  
}

export interface CartServiceDefinition extends grpc.ServiceDefinition {
  GetCart: MethodDefinition<_cart_GetUserRequest, _cart_GetUserResponse, _cart_GetUserRequest__Output, _cart_GetUserResponse__Output>
}
