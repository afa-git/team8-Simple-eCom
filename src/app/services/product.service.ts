import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';
import { TransactionProduct } from '../models/transaction-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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


  //for get data product
  getProducts(){
    
  }
}