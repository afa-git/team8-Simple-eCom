import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'team8-simple-ecomm';

  constructor(private authServ: AuthService){}

  ngOnInit(): void {
    console.log("Init")
    this.authServ.autoLogin()
  }
}
