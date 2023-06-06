import { Injectable } from '@angular/core';
import { Users } from '../models/ecomm.module';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPointURL:string = 'https://team8-ecomm-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'users.json';

  errorHandling = new Subject<any> ();

  constructor(private http: HttpClient) { }

  fetchPosts(){
 
    let customParam = new HttpParams();
    customParam = customParam.append('print','pretty');
    customParam = customParam.append('custom-param', 'custom-param-value');

    return this.http.get<{[key:string] : Users}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header'
      }),params: customParam,

    })
    .pipe(
      map( responseData => {
        const postArray : Users [] = [];
        for( const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id:key})
          }
        }
        return postArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes)
        }
      )
    );
  }

  onUpdatePost(updateData:Users) {
    let data = {[updateData.id]: { 
        user_id:updateData.user_id,
        user_name:updateData.user_name,
        role:updateData.role,
        enable:updateData.enable,
        locked:updateData.locked,
        id:updateData.id
    }};

    this.http.patch(this.postURL, data).subscribe(
      (data) => {
        console.log(data);
        alert("Edit Data User Berhasil ^^");
      }
    );
  }


  onCreatePost(postData: Users) {
    // Send Http request

    this.http.post<{id:string}>(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
        alert("Data User Berhasil Ditambahkan ^^");
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
