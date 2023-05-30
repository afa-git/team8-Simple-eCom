import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm! : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,Validators.required)
      })
    })
  }

  onSubmit() {
    console.log(this.signupForm.status);
    if(this.signupForm.status === 'INVALID'){
      alert("Email And Password are "+this.signupForm.status)
    }
  }


}
