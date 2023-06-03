import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductAdminService } from '../../services/product-admin.service';
import { Product } from 'src/app/models/ecomm.module';
import { Subscription } from 'rxjs';
// import { url } from 'inspector';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit, OnDestroy {

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private productService: ProductAdminService) { }

  id:string = '';
  trx_id:string = '';
  title:string='';
  image_url:string='';
  category:string='';
  amount:string='';
  description:string='';
  stocks:string='';

  ngOnInit(): void {
    this.fetchPosts();
    this.errorSub = this.productService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  error = null;  
  errorSub!: Subscription;
  public fetchPosts(){

    this.showLoading = true;
    this.productService.fetchPosts()
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

  onUpdatePost(updateData:Product) {
    this.productService.onUpdatePost(updateData);
  }

  onClickData(updateData:Product){
    this.trx_id = updateData.trx_id;
    this.amount = updateData.amount;
    this.title = updateData.title;
    this.stocks = updateData.stocks;
    this.description = updateData.description;
    this.image_url = updateData.image_url;
    this.category = updateData.category;
    this.id = updateData.id;
  }

  onClearPosts(deleteData:Product) {
    // Send Http request
    this.productService.deletePosts(deleteData);    
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
