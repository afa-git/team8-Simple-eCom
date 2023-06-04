import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';



export interface AuthRequestData{
  email:string,
  password:string,
  returnSecureToken:boolean
}

export interface AuthResponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router:Router) { }
  
  userSubject = new BehaviorSubject<User>(null!);
  tokenExpirationTimer:any;

  private handleAuthentication(email:string,localId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,localId,token,expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn *1000)
    localStorage.setItem('userData',JSON.stringify(user))
  }

  signup(authRequestData: AuthRequestData){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbtOA5M-4tFbFa_TWjXgO72J0Q1efm9k8',{
      email:authRequestData.email,
      password:authRequestData.password,
      returnSecureToken: authRequestData.returnSecureToken
    }).pipe(catchError(this.handleError))
  }

  signin(authRequestData: AuthRequestData){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbtOA5M-4tFbFa_TWjXgO72J0Q1efm9k8',{
      email:authRequestData.email,
      password:authRequestData.password,
      returnSecureToken: authRequestData.returnSecureToken
    }).pipe(
      catchError(this.handleError)
      ,tap(respData => {
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      })
    )
  }

  autoLogin(){
    const userData: {
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string,
    } = JSON.parse(localStorage.getItem('userData')!)

    console.log("data",userData)
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    console.log("loadedUser",loadedUser.token)
    if(loadedUser.token){
      this.userSubject.next(loadedUser);

      const expirationDuration = new Date (userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  logout(){
    console.log('log')
    this.userSubject.next(null!);
    this.router.navigate(["/auth"])
    localStorage.removeItem('userData')
  }
  
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout (() => {
      this.logout()
    }, expirationDuration)
  }


  private handleError(errorResponse:HttpErrorResponse){
    console.log("Masuk Error")
    console.log(errorResponse)
    let errorMsg = 'An unknow error occured!'
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMsg)
    }

    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already'
        break;
      case 'OPERATIONAL_NOT_ALLOWED':
        errorMsg = 'Password sign-in is disabled'
        break;
      case 'TOO_MANY_AT_ATTEMPTS_TRY_LATER':
        errorMsg = 'we have blocked'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'There is no user record'
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Password is invalid'
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator'
        break;
      default:
        break;
    }

    return throwError(errorMsg);
  }
}
