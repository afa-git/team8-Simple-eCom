import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-simple-report-user',
  templateUrl: './simple-report-user.component.html',
  styleUrls: ['./simple-report-user.component.css']
})
export class SimpleReportUserComponent implements OnInit, OnDestroy {

  loadedPosts : any []= [];
  showLoading = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.errorSub = this.userService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  error = null;  
  errorSub!: Subscription;
  public fetchPosts(){

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
