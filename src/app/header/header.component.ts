import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  subUser!: Subscription;
  
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.subUser = this.authServ.userSubject.subscribe(
      user => {
        console.log(!user);
        console.log(!!user);
        this.isAuthenticated = !!user;

      }
    )
  }

  ngOnDestroy(): void {
    this.authServ.userSubject.unsubscribe();
  }

  onLogout(){
    console.log("masuk mas")
    this.authServ.logout();
  }

  

}
