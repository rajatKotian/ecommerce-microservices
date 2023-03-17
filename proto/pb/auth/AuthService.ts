// Original file: proto/services/auth/v1/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetUserRequest as _auth_GetUserRequest, GetUserRequest__Output as _auth_GetUserRequest__Output } from '../auth/GetUserRequest';
import type { GetUserResponse as _auth_GetUserResponse, GetUserResponse__Output as _auth_GetUserResponse__Output } from '../auth/GetUserResponse';

export interface AuthServiceClient extends grpc.Client {
  GetUser(argument: _auth_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _auth_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _auth_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _auth_GetUserRequest, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _auth_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _auth_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _auth_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _auth_GetUserRequest, callback: grpc.requestCallback<_auth_GetUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUser: grpc.handleUnaryCall<_auth_GetUserRequest__Output, _auth_GetUserResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  GetUser: MethodDefinition<_auth_GetUserRequest, _auth_GetUserResponse, _auth_GetUserRequest__Output, _auth_GetUserResponse__Output>
}
