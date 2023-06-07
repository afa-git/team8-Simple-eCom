import { Injectable } from '@angular/core';
import { Buyer } from '../models/buyer.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  endPointURL:string = 'https://http-v-eleven-default-rtdb.asia-southeast1.firebasedatabase.app/';
  buyerURL:string = this.endPointURL+'buyer.json';

  constructor(private http:HttpClient) { }

  getBuyer(){
    return this.http.get<any[]>(this.buyerURL).pipe(
      map( responseData => {
        const productArray: Buyer[] = [];
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
 
  postBuyer(buyerData: Buyer) {
    return this.http.post<{name:string}>(this.buyerURL, buyerData);
  }

  deletePosts(id:string) {
    let url =this.endPointURL+'buyer/'+id+'.json';
 
    this.http.delete(url).subscribe(
      (id) => {
        alert("User is Successfully Delete");
        return;
      }
    );
  }
}


