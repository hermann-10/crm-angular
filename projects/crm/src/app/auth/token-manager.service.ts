export class TokenManager{
    storeToken(token: string){
        window.localStorage.setItem('authToken', token);
    }

    loadToken(){
        return window.localStorage.getItem('authToken');
    }

    removeToken(){
       window.localStorage.removeItem('authToken') 
    }
}