#!/bin/bash

rm -rf proto/pb/
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/pb proto/services/auth/v1/*.proto