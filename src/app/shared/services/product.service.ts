import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct, IProductData } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  baseUrl: string = 'assets/products.json';
  baseUrll: string = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient, private http: HttpClient) {}

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

  updateProduct(productId: number, productData: IProductData): Observable<any> {
    return this.httpClient.post(`${productId}`, productData);
  }

}
