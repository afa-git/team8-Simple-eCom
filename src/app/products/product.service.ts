import { Injectable } from '@angular/core';
import { Product } from '../ecomm.module';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endPointURL:string = 'https://team8-ecomm-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'products.json';

  constructor(private http: HttpClient) { }

  onCreatePost(postData: Product) {
    // Send Http request

    this.http.post<{name:string}>(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
