import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  onDetail(){
    console.log('masuk')
    this.router.navigate(['products',1],{relativeTo:this.route, queryParamsHandling:'preserve'})
  }

}
