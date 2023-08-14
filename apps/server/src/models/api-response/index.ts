interface IApiResponse {
    status: number;
    message: string;
    error?: unknown;
}

export { IApiResponse };
