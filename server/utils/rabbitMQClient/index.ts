import amqp from 'amqplib';
import { AppConfig } from '../../config';
import Logger from '../helpers/Logger';
import { ERROR_MESSAGES } from '../constants';


// A RabbitMQ class to manage the connection to a RabbitMQ server.
export default class RabbitMQ {
    // A static variable to hold the server connection instance.
    private static server: any;

    // A private static method to initialize and return the RabbitMQ server connection.
    static startServer(serverUrl: string) {
        try {
            /**
             * Check if the server connection instance is already created.
             * If not, establish a connection to the RabbitMQ server using the server URL.
             * */
            if (!this.server) {
                this.server = amqp.connect(serverUrl);
            }
            Logger.info('Rabbit MQ instance is Started');
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    static getServer() {
        if (!this.server) {
            throw ERROR_MESSAGES.NO_INSTANCE_MQ_FOUND;
        }
        return this.server;
    };
}