import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject, throwError } from 'rxjs';
import { TransactionProduct } from '../models/transaction-product.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endPointURL:string = 'https://http-v-eleven-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'product.json';

  errorHandling = new Subject<any>();
  constructor(private http:HttpClient) { }


  //for get data product
  getProducts(){
    return this.http.get<{[key:string] :Product}>(this.postURL)
    .pipe(
      map( responseData => {
        const productArray: Product[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            productArray.push({...responseData[key],id:key})
          }
        }
        return productArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes)
        }
      )
    )

  }

  


  //for add data product
  postProduct(postData: Product) {
    // Send Http request

    return this.http.post<{name:string}>(this.postURL, postData);
  }
}
