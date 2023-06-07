import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { BuyerService } from 'src/app/services/buyer.service';

@Component({
  selector: 'app-simple-report-user',
  templateUrl: './simple-report-user.component.html',
  styleUrls: ['./simple-report-user.component.css']
})
export class SimpleReportUserComponent implements OnInit {

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private buyerService: BuyerService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  error = null;  
  errorSub!: Subscription;
  public fetchPosts(){
    this.showLoading = true;
    this.buyerService.getBuyer()
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

  // ngOnDestroy(): void {
  //   this.errorSub.unsubscribe();
  // }

}
