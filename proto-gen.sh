#!/bin/bash

rm -rf server/services/Auth/proto/pb
rm -rf server/services/Cart/proto/pb
rm -rf server/services/Inventory/proto/pb
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=server/services/Auth/proto/pb server/services/Auth/proto/services/auth/v1/*.proto
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=server/services/Cart/proto/pb server/services/Cart/proto/services/cart/v1/*.proto
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=server/services/Inventory/proto/pb server/services/Inventory/proto/services/inventory/v1/*.proto