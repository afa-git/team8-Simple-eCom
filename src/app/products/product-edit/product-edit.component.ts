import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit, OnDestroy {

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private productService: ProductService) { }

  id:string = '';
  trx_id:string = '';
  name:string='';
  img_url_1:string='';
  img_url_2:string='';
  img_url_3:string='';
  img_url_4:string='';
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
    this.productService.getProducts()
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

  onClickData(postData:any){

    const img:any = [];
    img.push(postData.img_url_1);
    img.push(postData.img_url_2);
    img.push(postData.img_url_3);
    img.push(postData.img_url_4);

    this.trx_id = postData.trx_id;
    this.amount = postData.amount;
    this.name = postData.name;
    this.stocks = postData.stocks;
    this.description = postData.description;
    this.img_url_1 = postData.image_url[0];
    this.img_url_2 = postData.image_url[1];
    this.img_url_3 = postData.image_url[2];
    this.img_url_4 = postData.image_url[3];
    this.category = postData.category;
    this.id = postData.id;
  }

  onUpdatePost(postData:NgForm) {
    if(!postData.valid)
      return
      
    const img:any = [];
    img.push(postData.value.img_url_1);
    img.push(postData.value.img_url_2);
    img.push(postData.value.img_url_3);
    img.push(postData.value.img_url_4);

    const dataProduct:Product = {
        id:postData.value.id,
        trx_id:postData.value.trx_id,
        name:postData.value.name,
        amount:postData.value.amount,
        stocks:postData.value.stocks,
        image_url:img,
        description:postData.value.description,
        category:postData.value.category
    }

    this.productService.onUpdatePost(dataProduct);

  }

  onClearPosts(postData:NgForm) {
    if(!postData.valid)
      return

    let id:any = postData.value.id;

    this.productService.deletePosts(id);
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
