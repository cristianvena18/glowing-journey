export interface Response {
    status: number;
    body?: any;
    type?: string;
    url?: string;
}

export interface Request {
    body: any;
    url: string;
    method: string;
}