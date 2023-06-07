import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  loadedPosts : any []= [];
  showLoading = false;

    user_id:string='';
    user_name:string='';
    role:string='';
    enable:string='';
    locked:string='';
    id:string='';

  constructor(private buyerService: BuyerService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  error = null;  
  errorSub!: Subscription;
  public fetchPosts(){
    this.showLoading = true;
    this.buyerService.getBuyer().subscribe(
      (response)=>{
        this.loadedPosts = response;
      },
      (error)=>{
        console.log("error",error)
      }
    )
  }

  // onClickData(updateData:Users){
  //   this.user_id = updateData.user_id;
  //   this.user_name = updateData.user_name;
  //   this.role = updateData.role;
  //   this.enable = updateData.enable;
  //   this.locked = updateData.locked;
  //   this.id = updateData.id;
  //   this.id = updateData.id;
  // }
  
  // onUpdatePost(updateData:Users) {
  //   this.userService.onUpdatePost(updateData);
  // }

  // ngOnDestroy(): void {
  //   this.errorSub.unsubscribe();
  // }

  // onCreatePost(postData:{
  //   id:string;
  //   user_id:string;
  //   user_name:string;
  //   role:'user01';
  //   enable:'enable';
  //   locked:'unlocked';
  // }) {
  //   // Send Http request
  //   this.userService.onCreatePost(postData);
  // }

  onClearUser(id:string) {
    console.log("dataUser",id)

    this.buyerService.deletePosts(id);
  }

}

