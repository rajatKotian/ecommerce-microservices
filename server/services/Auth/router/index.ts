
import * as express from 'express'
import routes from './rest.routes'
import grpcRoutes from './grpc.routes'
import { GRPCServer } from '../utils/servers/GRPCServer';
import { GRPCClient } from '../utils/servers/GRPCClient';

let router = express.Router();
GRPCServer.startServer();
GRPCClient.startServer();


router.use('/', routes);
router.use('/grpc', grpcRoutes);

export default router;