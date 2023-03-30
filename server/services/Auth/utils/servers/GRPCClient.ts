import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/pb/auth';
import { AppConfig } from '../../../../config';
import Logger from '../../../../utils/helpers/Logger';
import moment from 'moment';

export class GRPCClient {
    private static clientInstance: GRPCClient;
    private port = AppConfig.get('grpc:authService:port')
    private deadline = moment(new Date()).add(1, 'day').toDate()
    private client;

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
        this.client = new grpcInstance.auth.AuthService(
            `0.0.0.0:${this.port}`,
            grpc.credentials.createInsecure()
        );
        this.client.waitForReady(this.deadline, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Logger.info(`Authentication service GRPC CLIENT started at port: ${this.port}`)
        });
    }


    public static startServer(): GRPCClient {
        if (!this.clientInstance) {
            this.clientInstance = new GRPCClient();
        }
        return this.clientInstance;
    }

    public static getClientInstance() {
        return this.clientInstance.client;
    }

}




