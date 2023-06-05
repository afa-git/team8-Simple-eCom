import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { TransactionProduct } from '../models/transaction-product.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionProductService {

  endPointURL:string = 'https://http-v-eleven-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL:string = this.endPointURL+'transaction_product.json';

  errorHandling = new Subject<any>();
  constructor(private http:HttpClient) { }

  //for add to chart product
  addToChartProduct(transactionProduct : TransactionProduct){
    console.log("Masuk Service")
    console.log(transactionProduct)
    this.http.post<{name : string}>(this.postURL, transactionProduct,{
      observe:'response'
    }).subscribe(
      (data) => {
        console.log(data)
        this.errorHandling.next(null)
      },
      (error) => {
        this.errorHandling.next(error)
      }
    )
  }

  getTransactionProduct(){
    return this.http.get<{[key:string] :TransactionProduct}>(this.postURL).pipe(
      map( responseData => {
        const productArray: TransactionProduct[] = [];
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


  /*
  arrColumnKey = ['date_modified','status_trx']
  arrColumnVal = {'date_modified':'12-JAN-2023','status_trx':'1'}
  
  */ 
  setTrxProduct(idTrx:string,refNo:string,arrColumnKey:any,arrColumnVal:any){
    return this.http.get<{[key:string] :TransactionProduct}>(this.postURL).pipe(
      map( responseData => {
       
        
        const productArray: TransactionProduct[] = [];



        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            productArray.push({...responseData[key]})
          }
        }
        const resultResponse = productArray.filter(item => item.ref_no.toLowerCase().includes(refNo.toLowerCase()));

        console.log("data",resultResponse)

        let dataUpdate:any = null!

        resultResponse.map( responseData2 => {
          let trxArray: any = {};
          let dataRes:any = responseData2
          for(const key in dataRes){
            
            if(arrColumnKey.includes(key.toString())){
              trxArray[key] = arrColumnVal[key]
            }else{
              trxArray[key] = dataRes[key]
            }

          }
          dataUpdate = {[idTrx]:trxArray};
          console.log("data trx result",dataUpdate)
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

  updateTransactionProduct(dataTransaction:any){
    return this.http.patch(this.postURL, dataTransaction);
  }
}
