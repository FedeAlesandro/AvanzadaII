import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { ProductCategoryService } from '../../services/product-category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-category-add-edit',
  templateUrl: './product-category-add-edit.component.html',
  styleUrls: ['./product-category-add-edit.component.css']
})
export class ProductCategoryAddEditComponent implements OnInit {

  productCategory: ProductCategory;
  productCategoryId: number;
  description: string;

  token: boolean = false;
  alert: boolean = false;

  constructor(private productCategoryService: ProductCategoryService, private userService: UserService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();

    if(!this.token)
      this.router.navigate(['unauthorized']);
      
    this.productCategoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productCategoryId != 0) {
      this.productCategoryService.getById(this.productCategoryId)
        .then(response => {
          this.productCategory = response;
        })
        .catch(error => {
        });
    }
  }

  addProductCategory() {
    let productCategory = new ProductCategory();
    productCategory.description = this.description;

    this.productCategoryService.save(productCategory)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  editProductCategory() {
    this.productCategory.productCategoryId = this.productCategoryId;
    if (this.description != null)
      this.productCategory.description = this.description;

    this.productCategoryService.edit(this.productCategory)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }
}
