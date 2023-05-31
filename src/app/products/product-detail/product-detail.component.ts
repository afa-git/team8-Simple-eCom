import { Component, OnInit } from '@angular/core';
import { TransactionProduct } from 'src/app/models/transaction-product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productServ:ProductService) { }
  ngOnInit(): void {
  }

  onClickImg(id:number){
    let ProductImg = document.getElementById("ProductImg") as HTMLImageElement | null;
    let SmallImg:any = document.getElementsByClassName("small-img");
    if(ProductImg && SmallImg){
      ProductImg.src = SmallImg[id].src
    }
  }

  onAddToChart(idProduct:string){
    if(!localStorage.getItem('userData')){
      alert("You dont have account, Please register now !")
      return
    }else{
      alert("WOW")
      const transactionProduct:TransactionProduct = {
        date_entry: new Date(),
        product_id:idProduct,
        product_name:'test',
        description:'test',
        amount:'123456',
        category_name:'test',
        status_trx:'test',
        user_id:'test',
        user_name:'test',
        date_modified:new Date(),
        image_url:'test',
        ref_no:'test',
        from_acct:'test',
        payment_name:'test'
      }
      this.productServ.addToChartProduct(transactionProduct);
    }
  }

}
