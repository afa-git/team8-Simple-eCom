import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject, throwError } from 'rxjs';
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

  setProduct(productId:string,arrColumnKey:any,arrColumnVal:any){
    return this.http.get<{[key:string] :Product}>(this.postURL).pipe(
      map( responseData => {
        let idProd :any;
        const productArray: Product[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            productArray.push({...responseData[key],id:key})
          }
        }

        const productRes = productArray.filter(item=>item.trx_id.toLowerCase().includes(productId.toLowerCase()))
        console.log("data Product res",productRes)
        let dataUpdate:any = null!

        productRes.map( responseData2 => {
          let trxArray: any = {};
          let dataRes:any = responseData2
          for(const key in dataRes){
            
            // pengurangan stock
            if(key.toString() == "stocks"){
              trxArray[key] = parseFloat(dataRes[key]) - 1
            }else if(key.toString() == "id"){
              idProd = dataRes[key]
            }else{
              
              if(arrColumnKey.includes(key.toString())){
                trxArray[key] = arrColumnVal[key]
              }else{
                trxArray[key] = dataRes[key]
              }

            }
          }
          dataUpdate = {[idProd]:trxArray};
          console.log("data trx result Prod",dataUpdate)
        }),
        catchError(
          errorRes => {
            return throwError(errorRes)
          }
        )
        return dataUpdate;
      }),

      catchError(
        errorRes => {
          return throwError(errorRes)
        }
      )
    )
  }

  updateProduct(dataProduct:any){
    return this.http.patch(this.postURL, dataProduct);
  }





}
