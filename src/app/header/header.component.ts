import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TransactionProductService } from '../services/transaction-product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  subUser!: Subscription;
  MenuItems:any
  countActiveTrx:number=0 
  role:string="";
  
  constructor(private authServ: AuthService, private transactionServ: TransactionProductService,) { 
    
  }

  userSubject = this.authServ.userSubject;

  ngOnInit(): void {
    this.subUser = this.authServ.userSubject.subscribe(
      user => {

        this.isAuthenticated = !!user;
        if(this.isAuthenticated){
          console.log('user masuk : ',user.role)
          this.role = user.role;
        }

      }
    )
    this.MenuItems = document.getElementById("MenuItems");
    this.MenuItems.style.maxHeight = "0px";
    this.getDataTransaction()
  }

  ngOnDestroy(): void {
    this.authServ.userSubject.unsubscribe();
  }

  onLogout(){
    console.log("masuk mas")
    this.authServ.logout();
  }



  menutoggle() {
    if (this.MenuItems.style.maxHeight == "0px") {
      this.MenuItems.style.maxHeight = "200px"
    }
    else {
      this.MenuItems.style.maxHeight = "0px"
    }
  }

  getDataTransaction(){
    console.log("ad",this.userSubject.value)
    if(this.userSubject.value !=null ){
      this.transactionServ.getTransactionProduct().subscribe(
        (response)=>{
          this.countActiveTrx = response.filter(
                item => 
                 item.email.includes(this.userSubject.value.email) && (
                 item.status_trx.includes("0") || 
                 item.status_trx.includes("1") || 
                 item.status_trx.includes("2") )
                 ).length;
        },
        (error)=>{
          console.log(error)
        }
      )

    }
  }


  

}
