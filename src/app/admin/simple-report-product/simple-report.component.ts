import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-simple-report',
  templateUrl: './simple-report.component.html',
  styleUrls: ['./simple-report.component.css']
})
export class SimpleReportComponent implements OnInit{

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private productService: ProductService) { }

  dataProducts:Product[] = [];

  ngOnInit(): void {
    this.fetchPosts();
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

  @ViewChild('report', {static:false}) el !: ElementRef;
  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=> {
        pdf.save("simple-report.pdf");
      }
    });
  }


}
