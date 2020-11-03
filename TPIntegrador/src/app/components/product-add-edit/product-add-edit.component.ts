import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/product-category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
  providers: [ProductService]
})
export class ProductAddEditComponent implements OnInit {

  productForm: FormGroup;

  product: Product = new Product();
  productId: number = 0;
  productCategoryId: string;
  productCategories: ProductCategory[] = [];

  token: boolean = false;
  alert: boolean = false;

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService,
    private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.token = this.userService.getToken();

    if (!this.token)
      this.router.navigate(['unauthorized']);

    this.productCategoryId = '0';
    
    this.productForm = new FormGroup({
      'productCategoryId': new FormControl(this.product.productCategoryId,
         [Validators.required],[]),
      'name': new FormControl(this.product.name, [Validators.required],[]),
      'description': new FormControl(this.product.description, [Validators.required],[]),
      'price': new FormControl(this.product.price, [Validators.required],[])
    })

    await this.getProductCategories();

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId != 0) {
      this.productService.getById(this.productId)
        .then(response => {
          this.product = response;
        })
        .catch(error => {
        });
    }
  }

  get productCategory(){ return this.productForm.get('productCategoryId')}
  get name(){ return this.productForm.get('name')}
  get description(){ return this.productForm.get('description')}
  get price(){ return this.productForm.get('price')}

  addProduct() {
    this.product = new Product();
    this.product.productCategoryId = Number(this.productCategory.value);
    this.product.name = this.name.value;
    this.product.description = this.description.value;
    this.product.price = this.price.value;

    this.productService.save(this.product)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  editProduct() {
    let product = new Product();
    product.productCategoryId = Number(this.productCategory.value);
    product.name = this.name.value;
    product.description = this.description.value;
    product.price = this.price.value;

    if (product.productCategoryId != null){
      this.product.productCategoryId = product.productCategoryId;
    }
    if (product.name != null)
      this.product.name = product.name;
    if (product.description != null)
      this.product.description = product.description;
    if (product.price != null)
      this.product.price = product.price;

    this.productService.edit(this.product)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  async getProductCategories(){
    await this.productCategoryService.getAll()
    .then(resolve => {
      this.productCategories = resolve;
    })
    .catch(error => {
    });
  }
}
