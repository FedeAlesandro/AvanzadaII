import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css'],
  providers: [ProductService]
})
export class ProductAddEditComponent implements OnInit {

  product: Product;
  productId: number = 0;
  productCategoryId: number;
  name: string;
  description: string;
  price: number;

  token: boolean = false;
  alert: boolean = false;

  constructor(private productService: ProductService, private userService: UserService,
     private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    
    if(!this.token)
      this.router.navigate(['unauthorized']);

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

    product.productCategoryId = this.productCategoryId;
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;

    this.productService.save(product)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }

  editProduct() {
    this.product.productId = this.productId;

    if (this.productCategoryId != null)
      this.product.productCategoryId = this.productCategoryId;
    if (this.name != null)
      this.product.name = this.name;
    if (this.description != null)
      this.product.description = this.description;
    if (this.price != null)
      this.product.price = this.price;

    this.productService.save(this.product)
      .then(response => {
        this.alert = true;
      })
      .catch(error => {
      });
  }
}
