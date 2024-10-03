import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  // Service to perform CRUD )perations
  getAllProducts() {
    return this.httpClient.get(`${this.baseUrl}/products`);
  }

  getProductById(productId: number) {
    return this.httpClient.get(`${this.baseUrl}/products/${productId}`);
  }
  // updateProduct(productId: number, productData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}products/${productId}`, productData);
  // }
  updateProduct(productId: number, productData: any): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/products/${productId}`, productData);
  }

  // updateProduct(id: number, data: any): Observable<any> {
  //   const url = `${this.baseUrl}/products/update/${id}`;
  //   return this.httpClient.put(url, data);
  // }

  addToCart(product: { productId: string; quantity: number }): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/cart/add`, product);
  }
}
