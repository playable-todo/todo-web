export interface ParametersProps {
    method?: string,
    url?: string,
    formData?: FormData | null
}

export interface Options {
    method?: string;
    headers?: {
        Authorization: string;
    };
    body?: FormData | undefined;
}

export interface Token {
    name: string,
    exp: number,
    username: string
}