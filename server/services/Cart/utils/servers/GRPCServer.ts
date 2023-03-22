import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import { AppConfig } from '../../../../config';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import Logger from '../../../../utils/helpers/Logger';
import { ProtoGrpcType } from '../../proto/pb/cart';
import { CartServiceHandlers } from '../../proto/pb/cart/CartService';


export class GRPCServer {
    private static server: GRPCServer;

    private port = AppConfig.get('grpc:cartService:port')
    private PROTO_FILE: string = '../../proto/services/cart/v1/cart.proto'
    private packageDef = protoLoader.loadSync(path.resolve(__dirname, this.PROTO_FILE))
    private grpcObject = (loadPackageDefinition(this.packageDef) as unknown) as ProtoGrpcType
    private authPackage = this.grpcObject.cart;

    private constructor() {
        const server = new Server();
        server.addService(this.authPackage.CartService.service, {
            GetCart: (req: any, res: any) => {
                console.log(req, res);
            }
        } as CartServiceHandlers)
        server.bindAsync(
            `0.0.0.0:${this.port}`,
            ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    Logger.error(err)
                }
                server.start();
                Logger.info(`Cart service GRPC Server started at port: ${port}`);
            })

    }


    public static startServer(): GRPCServer {
        if (!this.server) {
            this.server = new GRPCServer();
        }
        return this.server;
    }

}




