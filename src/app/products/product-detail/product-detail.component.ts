import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { Buyer } from 'src/app/models/buyer.model';
import { Product } from 'src/app/models/product.model';
import { TransactionProduct } from 'src/app/models/transaction-product.model';
import { BuyerService } from 'src/app/services/buyer.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionProductService } from 'src/app/services/transaction-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  dataProduct: Product = new Product("","",0,0,[],"","");
  size:string="XL";
  img_url:any[] = [];
  dataBuyer: Buyer = new Buyer("","","","","","",new Date());

  constructor(private transactionProductServe:TransactionProductService, private productServ:ProductService, private activatedRoute:ActivatedRoute, private buyerServe:BuyerService, private headerComp:HeaderComponent) {
   }
  ngOnInit(): void {
    this.getProductByTrxId(this.activatedRoute.snapshot.params.id);
  }
  

  onClickImg(id:number){
    let ProductImg = document.getElementById("ProductImg") as HTMLImageElement | null;
    let SmallImg:any = document.getElementsByClassName("small-img");
    if(ProductImg && SmallImg){
      ProductImg.src = SmallImg[id].src
    }
  }


  getProductByTrxId(trx_id:string){
    this.productServ.getProducts().subscribe(
      (response) => {
        const filteredResults = response.filter(item => item.trx_id.toLowerCase().includes(trx_id.toLowerCase()));
        this.dataProduct = filteredResults[0] // get data product
        this.dataProduct.image_url.forEach(element => {
          this.img_url.push(element)
        });
        console.log("el",this.img_url)
        // this.img_url = {
        //   url1:this.dataProduct.image_url.indexOf()
        // }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onAddToChart(dataTransaction:NgForm){
    console.log("masuk data",dataTransaction)

    const parseData = JSON.parse(localStorage.getItem('userData')!)
    console.log(parseData)

    if(!localStorage.getItem('userData')){
      alert("You dont have account, Please register now !")
      return
    }else{
      alert("WOW")

      // get data buyer 
      this.buyerServe.getBuyer().subscribe(
        (response)=>{
          const filteredResults = response.filter(item => item.email.toLowerCase().includes(parseData.email.toLowerCase()));
          console.log(filteredResults)
           if(filteredResults.length > 0){
            this.dataBuyer = filteredResults[0]
            let refNo = this.generateUniqueTransactionNumber();

            let img:any = this.dataProduct.image_url;

            const transactionProduct:TransactionProduct = {
              date_entry: new Date(),
              product_id:this.activatedRoute.snapshot.params.id,
              product_name:this.dataProduct.name,
              description:this.dataProduct.description,
              amount:this.dataProduct.amount,
              category_name:this.dataProduct.category,
              status_trx:'0',
              user_id: this.dataBuyer.id!,
              name:this.dataBuyer.name,
              date_modified:new Date(),
              ref_no:refNo,
              from_acct:'',
              payment_name:'',
              size:dataTransaction.value.size,
              email:this.dataBuyer.email,
              img_url:img[0],
              number_tlpn:'',
              address:''
            }
            console.log("trx",transactionProduct)
            this.transactionProductServe.addToChartProduct(transactionProduct);
           }
        },
        (error)=>{
          console.log(error);
        }
      )


    }
  }

  generateUniqueTransactionNumber() {
    const timestamp = Date.now().toString(); // Mendapatkan timestamp dalam bentuk string
    const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Mendapatkan 3 digit angka acak
    
    return timestamp + randomNumbers;
  }

}
