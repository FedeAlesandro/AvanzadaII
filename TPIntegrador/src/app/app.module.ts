import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductCategoryAddEditComponent } from './product-category-add-edit/product-category-add-edit.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductCategoryAddEditComponent,
    ProductCategoryListComponent,
    ProductAddEditComponent,
    ProductListComponent,
    UnauthorizedComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
