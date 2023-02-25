export interface IServiceLayerResponse {
    success: boolean;
    httpCode: any;
    response: any;
    data?: {} | []
    error?: {} | [] | unknown;
};
export interface IRepositoryLayerResponse {
    success: boolean;
    data?: {} | []
    error?: {} | [] | unknown;
};