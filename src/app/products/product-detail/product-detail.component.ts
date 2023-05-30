import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  onClickImg(id:number){
    let ProductImg = document.getElementById("ProductImg") as HTMLImageElement | null;
    let SmallImg:any = document.getElementsByClassName("small-img");
    if(ProductImg && SmallImg){
      ProductImg.src = SmallImg[id].src
    }
  }

}
