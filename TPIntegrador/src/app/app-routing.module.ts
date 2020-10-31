import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';
import { ProductCategoryAddEditComponent } from './components/product-category-add-edit/product-category-add-edit.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'product/add', component: ProductAddEditComponent },
  { path: 'product/edit/:id', component: ProductAddEditComponent },
  { path: 'product/list', component: ProductListComponent },
  { path: 'category/add', component: ProductCategoryAddEditComponent },
  { path: 'category/edit/:id', component: ProductCategoryAddEditComponent },
  { path: 'category/list', component: ProductCategoryListComponent },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
