import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { ProductAdminService } from '../../services/product-admin.service';

@Component({
  selector: 'app-simple-report',
  templateUrl: './simple-report.component.html',
  styleUrls: ['./simple-report.component.css']
})
export class SimpleReportComponent implements OnInit, OnDestroy {

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private productService: ProductAdminService) { }

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

  @ViewChild('report', {static:false}) el !: ElementRef;
  makePDF(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=> {
        pdf.save("simple-report.pdf");
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
