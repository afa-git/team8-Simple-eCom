import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import { UsersService } from 'src/app/services/user.service';
import { Users, Product } from 'src/app/models/ecomm.module';
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

  constructor(private userService: UsersService, private productService: ProductAdminService) { }

  ngOnInit(): void {
    this.fetchPostsUser();
    this.errorSub = this.userService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )

    this.fetchPosts();
    this.errorSub = this.productService.errorHandling.subscribe(
      error => {
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

  error = null;  
  errorSub!: Subscription;
  public fetchPostsUser(){

    this.showLoading = true;
    this.userService.fetchPosts()
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
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
