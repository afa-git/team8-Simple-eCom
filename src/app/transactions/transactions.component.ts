import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TransactionProductService } from '../services/transaction-product.service';
import { User } from '../models/user.model';
import { TransactionProduct } from '../models/transaction-product.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private authServ: AuthService, private transactionServ:TransactionProductService) { }

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

  onCheckOutChart(dataIn:TransactionProduct){

    let dataUpdate:any = null!

    let arrColumnKey = ['date_modified','status_trx']
    let arrColumnVal = { 
      date_modified: new Date(),
      status_trx: '1'
    }

    this.transactionServ.setTrxProduct(dataIn.id!,arrColumnKey,arrColumnVal).subscribe(
      (data)=>{

        console.log("data res",data)
        this.transactionServ.updateTransactionProduct(data).subscribe(
            (response)=>{
              console.log("update response",response)
              alert("success")
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
