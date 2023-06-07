import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestData, AuthService } from '../services/auth.service';
import { Buyer } from '../models/buyer.model';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  searchResults: any[] = [];
  errorMessage: string = "";

  constructor(private router: Router, private authService: AuthService, private buyerService:BuyerService) { }

  ngOnInit(): void {
    console.log('register masuk')
  }

  onLogin(){
    this.router.navigate(['auth'])
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return
    }

    console.log(authForm);

    const email = authForm.value.email
    const password = authForm.value.password
    const authReqData : AuthRequestData = {
      email:email,
      password:password,
      returnSecureToken:true,
      role:"2"
    }

    const buyerData : Buyer = {
       name:authForm.value.name,
       email:email,
       passowrd:password,
       role:'2',
       address:authForm.value.address,
       no_hp:authForm.value.no_hp,
       date_modified:new Date()
    } 
    console.log(buyerData)

    // for check duplicate account by email
    this.buyerService.getBuyer().subscribe(
      (response) => {
        console.log("Result respon",response)
        const filteredResults = response.filter(item => item.email.toLowerCase().includes(email.toLowerCase()));
        this.searchResults = filteredResults;
        console.log("Result filter",this.searchResults)

        if(this.searchResults.length > 0){
          this.errorMessage = "Your email already exist, please use a different email." 
          alert(this.errorMessage)
        }
        
      },
      (error) => {
        console.log(error);
      }
    );

    if(this.errorMessage == ""){
      console.log("Start")
      // for post data auth
      this.authService.signup(authReqData).subscribe(
          resdata=>{
            console.log("Success Sign Up")
            // for post data buyer
            this.buyerService.postBuyer(buyerData).subscribe(
              (data) => {
                alert("Buyer Success Add")
                authForm.reset();
              },
              (error) => {
                console.log(error);
                this.errorMessage = error.message;
              }
            );
          },
          error =>{
            console.log("signup",error)
            this.errorMessage = error.message;
          }
      )
    }  

    

    
  }

}
