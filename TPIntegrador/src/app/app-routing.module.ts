import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductCategoryAddEditComponent } from './product-category-add-edit/product-category-add-edit.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '/home'},
  { path: 'product/add', component: ProductAddEditComponent },
  { path: 'product/edit/:id', component: ProductAddEditComponent },
  { path: 'product/list', component: ProductListComponent },
  { path: 'category/add', component: ProductCategoryAddEditComponent },
  { path: 'category/edit/:id', component: ProductCategoryAddEditComponent },
  { path: 'category/list', component: ProductCategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
