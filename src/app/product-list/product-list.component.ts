import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductServices } from '../shared/services/product.service';
import { PrimaryButtonComponent } from '../components/buttons/primary-button.component';
import { CommonModule } from '@angular/common';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { OutlinedButtonComponent } from '../components/buttons/outlined-button.component';
import { Router } from '@angular/router';
import { IProduct } from '../shared/interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: IProduct[] = [];
  filter: string = '';

  constructor(
    private productServices: ProductServices,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }
  // Get all products
  getAllProduct() {
    this.productServices.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (error) => {
        console.log('Error getting products:', error);
      },
    });
  }
  get filteredProducts() {
    return this.filter === ''
      ? this.products // Show all products if no filter is selected
      : this.products.filter((product) => product.category === this.filter);
  }

  goToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
