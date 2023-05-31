import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private router:Router,private authService:AuthService) { }

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

    this.authService.signin(authReqData).subscribe(
        resdata=>{
          console.log('Berhasil Login')
          console.log(resdata)
        },
        error =>{
          console.log(error)
        }
    )

    authForm.reset();
  }

  onRegister(){
    this.router.navigate(['/register'])
  }


}
