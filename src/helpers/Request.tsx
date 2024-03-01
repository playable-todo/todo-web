
import { ParametersProps, Options, Token } from "./interface";

let loadingAccessToken: boolean = false;

const EndPoint = import.meta.env.VITE_ENDPOINT;
const ClientSecret = import.meta.env.VITE_CLIENT_SECRET;
const ClientId = import.meta.env.VITE_CLIENT_ID;
const GrantType = import.meta.env.VITE_GRANT_TYPE;

import { jwtDecode } from "jwt-decode";

/*
    controls jwt for security in localstorage
    because request management
*/
function verifyJWT(get_token: string){
    const now = Math.floor(Date.now() / 1000);

    try{
        const decode = jwtDecode<Token>(get_token);

        if((now < decode.exp) || !(decode.username)){
           return true
        }else {
            return false
        }
        
    }
    catch(err){
        return err
    }
} 

/*
   waits request when expired token
*/
function waiting(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
    custom request function for login
*/
export async function HandleLoginToken(username: string, password: string) {
    loadingAccessToken = true;

    const appEndpoint = EndPoint + '/oauth/token';

    const formdata: FormData = new FormData();
    formdata.append("client_id", ClientId);
    formdata.append("client_secret", ClientSecret);
    formdata.append("grant_type", "password");
    formdata.append("username", username);
    formdata.append("password", password);

    const options: Options = {
        method: 'POST',
        body: formdata
    };

    const response = await fetch(appEndpoint, options);

    const data = await response.json();

    if (!data.error) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        loadingAccessToken = false;
    }

    return data;
} 

/*
    gives access token for expired and invalid access token 
*/
export async function GetClientAccessToken(){
   
    loadingAccessToken = true;

    const appEndpoint = EndPoint + "/oauth/token";

    const formdata: FormData = new FormData();
    formdata.append("client_id", ClientId);
    formdata.append("client_secret", ClientSecret);
    formdata.append("grant_type", GrantType);
   
    const response = await fetch(appEndpoint, {
        method: 'POST',
        body: formdata,
    });

    let data;
  
    if(response.status === 200){
        data = await response.json();
        localStorage.setItem("access_token", data['access_token']);
        location.reload();
    }
    else if (response.status === 401) {
         const CheckData = await response.json();
         if(CheckData.error == 'invalid_grant'){
            data = {error : 401, error_description : 'Email adresiniz veya parolanız yanlış olabilir.'};
        }
        else{
            data = {error : 401, error_description : 'Yetkiniz bulunmamaktadır.'};
        }
    }
    else if (response.status === 403) {
        data = {error : 403, error_description : "Yetkiniz olmayan talepte bulundunuz."};
    }
    else if (response.status === 404) {
        data = {error : 404, error_description : "Sayfa bulunamadı."};
    }
    else if(response.status === 500){
        data = {error : 500, error_description : "Beklenmedik hata oluştu."};
    }
    else{
        data = {error : response, error_description: response.statusText};
    }

    return data;
}

/*
    gives refrest and access token for expired and invalid refresh token
*/
export async function ReloadAccessToken() {
    if (loadingAccessToken == true) {
        return false;
    }

    const refresh_token: string = localStorage.getItem("refresh_token") || '';
    const refreshVerify = verifyJWT(refresh_token)

    loadingAccessToken = true;

    const appEndpoint = EndPoint + '/oauth/token';

    const formdata: FormData = new FormData();
    formdata.append("client_id", ClientId);
    formdata.append("client_secret", ClientSecret);
    formdata.append("grant_type", "refresh_token");
    formdata.append("refresh_token", refresh_token);

    const options: Options = {
        method: 'POST',
        body: formdata
    };

    const response: any = refreshVerify == true ? await fetch(appEndpoint, options) : false;

    if (response.status != 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('authUser');

        location.href = "/";
        return false;
    }

    const data = await response.json();

    if (!data) {
        return false;
    }

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    loadingAccessToken = false;

    return data;
} 

/*
    Management Request for user
*/
export async function Request(parameters: ParametersProps): Promise <object[]> {
    const {method, url, formData} = parameters
    const access_token: string = localStorage.getItem('access_token')!;
    const accessVerify = verifyJWT(access_token);

    if (loadingAccessToken == true) {
        await waiting(500);
        return await Request(parameters);
    }

    const appEndpoint = EndPoint + url;
    
    const options: Options = {
        method: method,
        headers: {
            "Authorization": "Bearer " +  access_token
        },
    }
    if (method == 'POST' || method == 'PUT' || method == "PATCH") {
        options.body = formData ? formData : undefined;
    }
    
    const response: any = accessVerify == true ? await fetch(appEndpoint, options) : false

    if ((response.status == 401 || response.status == 403 || response == false)) {
        if (localStorage.getItem("refresh_token")) {
            await ReloadAccessToken();
        } else {
            await GetClientAccessToken();
        }
       
        return await Request(parameters);
    }

    const data = await response.json();

    return data;
}

/*
    Management Request for everyone
*/
export async function RequestPublic(parameters: ParametersProps): Promise <object[]> {
    const {method, url, formData} = parameters

    const appEndpoint = EndPoint + url;
    
    const options: Options = {
        method: method
    }

    if (method == 'POST' || method == 'PUT' || method == "PATCH") {
        options.body = formData ? formData : undefined;
    }
   
    const response: Response = await fetch(appEndpoint, options)

    if ((response.status == 401 || response.status == 403)) {
        return await RequestPublic(parameters);
    }

    const data = await response.json();

    return data;
}
