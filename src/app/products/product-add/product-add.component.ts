import { Component, OnInit } from '@angular/core';
import { ProductAdminService } from '../../services/product-admin.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductAdminService) { }

  ngOnInit(): void {
    
  }

  onCreatePost(postData:{
    id:string;
    trx_id:string;
    title:string;
    amount:string;
    stocks:string;
    image_url:string;
    description:string;
    category:string;
    entry_date:Date;
  }) {
    // Send Http request
    this.productService.onCreatePost(postData);
  }
}
