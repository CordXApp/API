export type RouterTypes = {
    method: string;
    url: string;
    preHandler?: any;
    handler?: any;
    config?: Ratelimit;
    schema?: Swagger;
}

export type Swagger = {
    summary?: string;
    description?: string;
    tags?: string[];
    params?: any;
    response?: any;
}

export type Ratelimit = {
    rateLimit: {
        max: number;
        ban: number;
        timeWindow: number;
        errorResponseHandler: any;
        onExceeding: any;
        onExceeded: any;
        onBanReach: any;
    }
}