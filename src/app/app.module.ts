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
import { ShortenPipe } from './shorten.pipe';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SimpleReportComponent } from './admin/simple-report/simple-report.component';

const appRoutes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'products/:id', component:ProductDetailComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'productadd', component:ProductAddComponent},
  {path: 'productedit', component:ProductEditComponent},
  {path: 'admin', component:DashboardAdminComponent},
  {path: 'users', component:UserManagementComponent},
  {path: 'report', component:SimpleReportComponent}
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
    HeaderAdminComponent,
    DashboardAdminComponent,
    UserManagementComponent,
    SimpleReportComponent
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
