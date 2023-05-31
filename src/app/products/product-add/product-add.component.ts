import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
  }

  onCreatePost(postData:{
    trx_id:string;
    name:string;
    amount:number;
    stocks:number;
    image_url:string;
    description:string;
    img_url_1:string;
    img_url_2:string;
  }) {
    // Send Http request
    this.productService.onCreatePost(postData);
  }
}
