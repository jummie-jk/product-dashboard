import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductData } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  // Service to perform CRUD )perations
  getAllProducts(): Observable<IProduct[]> { 
    return this.httpClient.get<IProduct[]>(`${this.baseUrl}/products`);
  }

  getProductById(productId: number): Observable<IProductData> {
    return this.httpClient.get<IProductData>(`http://localhost:3000/products/${productId}`);
  }

  updateProduct(productId: number, productData: IProductData): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/products/${productId}`, productData);
  }

}
