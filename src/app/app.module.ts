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
import { ProductEditComponent} from './products/product-edit/product-edit.component'
import { ShortenPipe } from './pipe/shorten.pipe';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SimpleReportComponent } from './admin/simple-report-product/simple-report.component';
import { SimpleReportUserComponent } from './admin/simple-report-user/simple-report-user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProductPipe } from './pipe/product.pipe';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { SellerGuard } from './guard/seller.guard';


const appRoutes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'products/:id', component:ProductDetailComponent},

  {path: 'auth', component:AuthComponent},

  {path: 'register', component:RegisterComponent},
  {canActivate:[SellerGuard],
    path: 'productadd', component:ProductAddComponent},
  {canActivate:[SellerGuard],
    path: 'productedit', component:ProductEditComponent},
  {
    canActivate:[SellerGuard],
    path: 'admin', component:DashboardAdminComponent},
  {
    canActivate:[SellerGuard],
    path: 'users', component:UserManagementComponent},
  {
    canActivate:[SellerGuard],
    path: 'reportproducts', component:SimpleReportComponent},
  {canActivate:[SellerGuard],
    path: 'reportusers', component:SimpleReportUserComponent},

  { canActivate:[AuthGuard],
    path: 'transactions', component:TransactionsComponent},


  {path: 'not-found',component:PageNotFoundComponent},
  {path: '**',redirectTo:'/not-found'},
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
    AuthComponent,
    ProductEditComponent,
    ShortenPipe,
    DashboardAdminComponent,
    UserManagementComponent,
    SimpleReportComponent,
    SimpleReportUserComponent,
    TransactionsComponent,
    ProductPipe,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
