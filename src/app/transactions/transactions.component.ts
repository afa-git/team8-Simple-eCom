import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TransactionProductService } from '../services/transaction-product.service';
import { User } from '../models/user.model';
import { TransactionProduct } from '../models/transaction-product.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private authServ: AuthService, private transactionServ:TransactionProductService, private productServ:ProductService) { }

  userSubject:User = null!
  dataTransactions:TransactionProduct[] = [];

  ngOnInit(): void {

    this.userSubject = this.authServ.userSubject.value;
    this.getTransaction()

  }

  getTransaction(){
    if(this.userSubject != null){
      this.transactionServ.getTransactionProduct().subscribe(
        (response)=>{
          const filteredResults = response.filter(item=>item.email.includes(this.userSubject.email))
          console.log("trx prod",filteredResults)
          this.dataTransactions = filteredResults;

        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  onUpdateStatus(dataIn:TransactionProduct,statusTrx:string){

    let dataUpdate:any = null!
    let arrColumnKey:any = [];
    let arrColumnVal:any = {};
    // 2
    if(statusTrx == '2'){
      arrColumnKey = ['date_modified','status_trx']
      arrColumnVal = { 
        date_modified: new Date(),
        status_trx: statusTrx
      }
    }else if(statusTrx == '4'){ //4
      arrColumnKey = ['date_modified','status_trx']
      arrColumnVal = { 
        date_modified: new Date(),
        status_trx: statusTrx
      }
    }else if(statusTrx == '5'){ //5
      arrColumnKey = ['date_modified','status_trx']
      arrColumnVal = { 
        date_modified: new Date(),
        status_trx: statusTrx
      }
    }else if(statusTrx == '6'){ //6
      arrColumnKey = ['date_modified','status_trx',]
      arrColumnVal = { 
        date_modified: new Date(),
        status_trx: statusTrx
      }
    }
    
    //5

    //6

    
   

    this.transactionServ.setTrxProduct(dataIn.id!,dataIn.ref_no,arrColumnKey,arrColumnVal).subscribe(
      (data)=>{

        console.log("data res",data)
        this.transactionServ.updateTransactionProduct(data).subscribe(
            (response)=>{
              console.log("update response",response)
              alert("success")

              // Update Stock Product
              if(statusTrx == '5'){
                this.productServ.setProduct(dataIn.product_id,arrColumnKey,arrColumnVal).subscribe(
                    (dataProduct)=>{
                      this.productServ.updateProduct(dataProduct).subscribe(
                        (response2)=>{
                          console.log("Update Product Success")
                        },
                        (error)=>{
                          console.log(error)
                        }
                      )
                    },
                    (erorrProducy)=>{

                    }
                )
              }

              this.getTransaction()
            },
            (error)=>{
              console.log(error)
            }
        )
        
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  

}
