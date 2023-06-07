import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productServ : ProductService, private router:Router) { }
  products:any = [];

  ngOnInit(): void {
    this.getProductList();
  }


  getProductList(){
    console.log("ini product")
    this.productServ.getProducts().subscribe(
      products => {
        
        this.products = products
        console.log(this.products)
      },error => {
        console.log(error)
      }
    )
  }

  onDetailProduct(id:String){
    this.router.navigate(['products',id])
  }

}
