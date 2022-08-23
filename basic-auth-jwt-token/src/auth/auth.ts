export interface LocalValidatedStrategy {
    user: {
        username: string,
        id: string,
    }
}

export interface TokenLoginResponse {
    access_token: string;
}