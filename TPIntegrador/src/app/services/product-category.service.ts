import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  
  private apiURL = "https://utn-avanzada2-tp-final.herokuapp.com/api/ProductCategory/";
  
  constructor(private http: HttpClient) { }

  getAll(): Promise<any>{
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getById(productCategoryId: number): Promise<any>{
    return this.http.get(this.apiURL + productCategoryId)
      .toPromise();
  }

  save(product: ProductCategory): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.apiURL, product, httpOptions)
      .toPromise();
  };

  edit(product: ProductCategory): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(this.apiURL, product, httpOptions)
      .toPromise();
  };
}
