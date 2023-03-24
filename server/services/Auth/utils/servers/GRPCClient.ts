import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/pb/auth';
import { AppConfig } from '../../../../config';
import Logger from '../../../../utils/helpers/Logger';
import moment from 'moment';

export class GRPCClient {
    private static client: GRPCClient;
    private port = AppConfig.get('grpc:authService:client')
    private deadline = moment(new Date()).add(1, 'day').toDate()


    private constructor() {

        const options: protoLoader.Options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        };

        const PROTO_FILE = '../../proto/services/auth/v1/auth.proto';
        const packageDef = protoLoader.loadSync(
            path.resolve(__dirname, PROTO_FILE),
            options
        );

        const grpcInstance = grpc.loadPackageDefinition(
            packageDef
        ) as unknown as ProtoGrpcType;
        const client = new grpcInstance.auth.AuthService(
            `0.0.0.0:${this.port}`,
            grpc.credentials.createInsecure()
        );
        client.waitForReady(this.deadline, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Logger.info("? gRPC Client is ready")
        });
    }


    public static startServer(): GRPCClient {
        if (!this.client) {
            this.client = new GRPCClient();
        }
        return this.client;
    }

}




