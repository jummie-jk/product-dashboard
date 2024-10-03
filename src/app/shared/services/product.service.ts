import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IProduct, IProductData } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  baseUrl: string = 'assets/products.json';
  baseUrll: string = 'http://localhost:3000/products';
  localStorageKey: string = 'products';

  constructor(private httpClient: HttpClient,) {
  }

  // Service to perform CRUD )perations
  getAllProducts(): Observable<IProduct[]> { 
    return this.httpClient.get<IProduct[]>(`${this.baseUrl}`);
  }

  // getProductById(productId: number): Observable<IProductData> {
  //   return this.httpClient.get<IProductData>(`http://localhost:3000/products/${productId}`);
  // }

  getProductById(productId: number): Observable<IProductData> {
    return this.httpClient.get<IProduct[]>(this.baseUrl).pipe(
      map((products: IProduct[]) => {
        return products.find((product) => product.id === productId) as IProductData;
      })
    );
  }

  // updateProduct(productId: number, productData: IProductData): Observable<any> {
  //   return this.httpClient.post(`${productId}`, productData);
  // }
  
  updateProduct(productId: number, updatedProduct: IProductData): Observable<void> {
    let products: IProductData[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    products = products.map((product) => (product.id === productId ? updatedProduct : product));
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
    return of();
  }

}
