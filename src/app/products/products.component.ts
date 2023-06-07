import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataProducts:Product[] = []!
  img:any[]=[];
  constructor(private route:ActivatedRoute,private router:Router, private productServ:ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  onDetail(id:String){
    this.router.navigate(['products',id])
  }

  getProducts(){
    this.productServ.getProducts().subscribe(
      (response)=>{
        this.dataProducts = response
        let data = []!;
        this.img = []!;
        this.dataProducts.forEach(product => {
          data = product.image_url;
          this.img.push(data[0])
        });


      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
