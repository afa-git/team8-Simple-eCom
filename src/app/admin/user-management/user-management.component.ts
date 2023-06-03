import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/ecomm.module';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,OnDestroy {

  loadedPosts : any []= [];
  showLoading = false;

    user_id:string='';
    user_name:string='';
    role:string='';
    enable:string='';
    locked:string='';
    id:string='';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.errorSub = this.userService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  error = null;  
  errorSub!: Subscription;
  public fetchPosts(){

    this.showLoading = true;
    this.userService.fetchPosts()
    .subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;
      },
      error => {
        console.log(error);     
        this.error = error;  
      }
    )
  }

  onClickData(updateData:Users){
    this.user_id = updateData.user_id;
    this.user_name = updateData.user_name;
    this.role = updateData.role;
    this.enable = updateData.enable;
    this.locked = updateData.locked;
    this.id = updateData.id;
    this.id = updateData.id;
  }
  
  onUpdatePost(updateData:Users) {
    this.userService.onUpdatePost(updateData);
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData:{
    id:string;
    user_id:string;
    user_name:string;
    role:'user01';
    enable:'enable';
    locked:'unlocked';
  }) {
    // Send Http request
    this.userService.onCreatePost(postData);
  }
}

