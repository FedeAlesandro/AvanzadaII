import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductCategoryService } from '../../services/product-category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productCategories: ProductCategory[];

  token: boolean = false;

  constructor(private productService: ProductCategoryService, private userService: UserService,
      private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();

    if(!this.token)
      this.router.navigate(['unauthorized']);
      
    this.productService.getAll()
      .then(response => {
        this.productCategories = response;
      })
      .catch(error => {
      });
  }
}
