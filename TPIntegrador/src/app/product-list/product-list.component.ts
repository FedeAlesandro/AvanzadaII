import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  token: boolean = false;

  constructor(private productService: ProductService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();

    if (!this.token)
      this.router.navigate(['unauthorized']);

    this.productService.getAll()
      .then(response => {
        this.products = response;
      })
      .catch(error => {
      });
  }

  deleteProduct(productId: number) {
    this.productService.delete(productId)
      .then(response => {
      })
      .catch(error => {
      });

    this.products.forEach(product => {
      if (product.productId == productId)
        this.products.splice(this.products.indexOf(product), 1);
    });
  }
}
