import { Injectable } from '@angular/core';
import { Product } from '../models/ecomm.module';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  endPointURL:string = 'https://team8-ecomm-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'products.json';

  errorHandling = new Subject<any> ();

  constructor(private http: HttpClient) { }

  fetchPosts(){
 
    let customParam = new HttpParams();
    customParam = customParam.append('print','pretty');
    customParam = customParam.append('custom-param', 'custom-param-value');

    return this.http.get<{[key:string] : Product}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header'
      }),params: customParam,

    })
    .pipe(
      map( responseData => {
        const postArray : Product [] = [];
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

  onCreatePost(postData: Product) {
    // Send Http request

    this.http.post<{id:string}>(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
        alert("Data Berhasil Ditambahkan ^^");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdatePost(updateData:Product) {
    let data = {[updateData.id]: { 
      trx_id: updateData.trx_id,
      title: updateData.title, 
      amount: updateData.amount, 
      stocks: updateData.stocks, 
      image_url: updateData.image_url,
      description: updateData.description,
      category:updateData.category
    }};

    this.http.patch(this.postURL, data).subscribe(
      (data) => {
        console.log(data);
        alert("Edit Data Berhasil ^^");
      }
    );
  }

  deletePosts(updateData:Product) {
    let data = {[updateData.id]: { 
      trx_id: updateData.trx_id,
      title: updateData.title, 
      amount: updateData.amount, 
      stocks: updateData.stocks, 
      image_url: updateData.image_url,
      description: updateData.description,
      category:updateData.category
    }};

    this.http.delete(this.postURL, data).subscribe(
      (data) => {
        console.log(data);
        alert("Hapus Data Berhasil -_-");
        return;
      }
    );
  }
}
