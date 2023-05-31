import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log('register masuk')
  }

  onLogin(){
    this.router.navigate(['auth'])
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

  this.authService.signup(authReqData).subscribe(
      resdata=>{
        console.log("Berhasil Ditambah")
        console.log(resdata)
      },
      error =>{
        console.log(error)
      }
  )

  authForm.reset();
  }

}
