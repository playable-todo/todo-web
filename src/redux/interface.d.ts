// Auth User

export interface LoginData {
    id?: number,
    about?: string,
    email?: string,
    fullname?: string,
    phone_number?: string,
    photo?: loginPhoto
}

export interface AuthUserState {
    loginData?: LoginData;
}