import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'products/:id', component:ProductDetailComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'product-add', component:ProductAddComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductDetailComponent,
    DashboardComponent,
    AuthComponent,
    RegisterComponent,
    ProductListComponent,
    ProductAddComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
