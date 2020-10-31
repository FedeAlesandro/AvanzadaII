import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/product-category';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
  providers: [ProductService]
})
export class ProductAddEditComponent implements OnInit {

  productForm: FormGroup;

  product: Product;
  productAux: Product;
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

    this.productAux = new Product();
    this.productCategoryId = '0';
    
    this.productForm = new FormGroup({
      'productCategoryId': new FormControl(""),
      'name': new FormControl(""),
      'description': new FormControl(""),
      'price': new FormControl(0)
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

  addProduct() {
    let product = new Product();
    product.productCategoryId = Number(this.productForm.get('productCategoryId').value);
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value;

    this.productService.save(product)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  editProduct() {
    this.product.productId = this.productId;

    let product = new Product();
    product.productCategoryId = Number(this.productForm.get('productCategoryId').value);
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value;

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
