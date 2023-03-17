#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/pb proto/services/auth/v1/*.proto