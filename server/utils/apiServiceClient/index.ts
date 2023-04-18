
import { AppConfig } from "../../config";
import { IAPIService } from "../interface";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs';


const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'brackets' });

class APIClient {
    private axiosInstance: AxiosInstance;
    private baseUrl: string = AppConfig.get('baseURLs:backendUrl')

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            paramsSerializer: paramsSerializer
        });

/* TODO: HANDLE TOKENS HERE */

        // this.axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
        //
        //     let refresh = LocalStorageService.getItem<string>('refreshToken');
        //     let accessToken = LocalStorageService.getItem<string>('accessToken');
        //     if (accessToken) {
        //         config.headers = {
        //             'x-refresh': refresh,
        //             Authorization: 'Bearer ' + accessToken,
        //             'Content-Type': 'application/json'
        //         }
        //     }

        //     return config;
        // });

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: any) => {
                throw error;
            }
        );
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return this.axiosInstance.get(url, config);
    }

    public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return this.axiosInstance.post(url, data, config);
    }

    public put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return this.axiosInstance.put(url, data, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return this.axiosInstance.delete(url, config);
    }
}

export default APIClient;