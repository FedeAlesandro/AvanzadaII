import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  productCatalogForm: FormGroup;

  productCategory: ProductCategory = new ProductCategory();
  productCategoryId: number;
  
  token: boolean = false;
  alert: boolean = false;

  constructor(private productCategoryService: ProductCategoryService, private userService: UserService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();

    if(!this.token)
      this.router.navigate(['unauthorized']);
    
    this.productCatalogForm = new FormGroup({
      'description': new FormControl(
        this.productCategory.description, [Validators.required, Validators.maxLength(50)],[])
    })

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

  get description(){ return this.productCatalogForm.get('description')}

  addProductCategory() {
    let productCategory = new ProductCategory();
    productCategory.description = this.description.value;

    this.productCategoryService.save(productCategory)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  editProductCategory() {
    let description = this.description.value;

    if (description != null)
      this.productCategory.description = description;

    this.productCategoryService.edit(this.productCategory)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }
}
