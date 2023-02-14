import axios, { Axios } from 'axios'
import { AppConfig } from '../config';
import { ENVIRONMENTS, REST_METHODS } from '../utils/AppConstants';

interface MethodsInterface {
    GET: "get",
    PUT: "put",
    POST: "post",
    DELETE: "delete",
    PATCH: "patch",
}

interface APIServiceInterface {
    headers: any
    body: String;
    endpoint: String;
    params: String;
    method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
    serviceType: String;
}



export default class APIService {

    config: APIServiceInterface
    client: Axios

    constructor(args: APIServiceInterface) {
        this.config = args;


        this.client = axios.create({
            baseURL: AppConfig.get(`baseURLs:backendUrl`)
        });

    }

    async call() {
        try {
            const { body, method, endpoint, params, headers } = this.config
            let url = `${AppConfig.get(`baseURLs:backendUrl`)}${endpoint}`
            this.client.get((endpoint).toString(), {
                params,
                headers,
            });

        } catch (error) {
            console.log("error", error)
        }

    }


}