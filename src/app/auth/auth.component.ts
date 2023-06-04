import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequestData, AuthService } from '../services/auth.service';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(
    private router:Router,
    private authService:AuthService,
    private activatedRouter: ActivatedRoute,
    private buyerService:BuyerService
    ) { }

  searchResults: any[] = [];
  errorMessage: string = "";
  ngOnInit(): void {
    
  }


  onSubmit(authForm: NgForm){

    if(!authForm.valid)
      return

    console.log(authForm);

    const email = authForm.value.email
    const password = authForm.value.password
    const authReqData : AuthRequestData = {
      email:email,
      password:password,
      returnSecureToken:true
    }

    // for check duplicate account by email
    this.buyerService.getBuyer().subscribe(
      (response) => {
        console.log("Result respon",response)
        const filteredResults = response.filter(item => item.email.toLowerCase().includes(email.toLowerCase()));
        this.searchResults = filteredResults;
        console.log("Result filter",this.searchResults)
        if(this.searchResults.length != 1){
          this.errorMessage = "Your account is not regitered" 
          alert(this.errorMessage)
        }

        if(this.errorMessage == ""){
          console.log("masuk nih")
          this.authService.signin(authReqData).subscribe(
              resdata=>{
                console.log('Berhasil Login')
                authForm.reset();
                this.router.navigate(['/'])
              },
              error =>{
                console.log(error)
              }
          )
        }
      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );

    
  }

  onRegister(){
    this.router.navigate(['/register'],{relativeTo:this.activatedRouter})
  }


}
