import { Component, Input, OnInit } from '@angular/core';
import { TransactionProduct } from 'src/app/models/transaction-product.model';
import { TransactionProductService } from 'src/app/services/transaction-product.service';
import { TransactionsComponent } from '../transactions.component';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  @Input() dataTransaction:TransactionProduct = null!;



  constructor(private transactionServ: TransactionProductService , private transactionCom:TransactionsComponent,private authServ:AuthService) { }


  ngOnInit(): void {


    console.log("item new",this.dataTransaction)
  }

  onCheckOutChart(dataForm:NgForm){
    console.log(dataForm)
    let dataUpdate:any = null!

    let arrColumnKey = ['date_modified','status_trx','number_tlpn','address']
    let arrColumnVal = { 
      date_modified: new Date(),
      status_trx: '1',
      number_tlpn:dataForm.value.number_tlpn,
      address:dataForm.value.address
    }

    console.log("val",arrColumnVal)

    this.transactionServ.setTrxProduct(this.dataTransaction.id!,arrColumnKey,arrColumnVal).subscribe(
      (data)=>{
        console.log("data res",data)
        this.transactionServ.updateTransactionProduct(data).subscribe(
            (response)=>{
              console.log("update response",response)
              alert("success")
              this.transactionCom.getTransaction()
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
