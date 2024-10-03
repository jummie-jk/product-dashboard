import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServices } from '../shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductData } from '../shared/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productId!: number;
  product!: IProductData;
  isEditing: boolean = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productServices: ProductServices,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.getProductDetails(this.productId);
    this.loadProduct();
    this.initializeForm();
  }


  // Get Product Details
  getProductDetails(productId: number): void {
    this.productServices.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price,
        });
        console.log('hvgh', this.product);
      },
      error: (err) => {
        console.error('Error fetching product details', err);
      },
    });
  }
  
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  initializeForm(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        // Initialize other fields as needed
      });
    }
  }

  loadProduct(): void {
    this.product = JSON.parse(localStorage.getItem('currentProduct') || '{}');
  }

  // Edit Product
  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.product,
        ...this.productForm.value,
      };
      localStorage.setItem('currentProduct', JSON.stringify(updatedProduct));
      this.product = updatedProduct;
      this.isEditing = false;
    }
  }

  // Edit Product
  // updateProduct(): void {
  //   if (this.productForm.valid) {
  //     const updatedProduct = {
  //       ...this.product,
  //       ...this.productForm.value,
  //     };

  //     this.productServices
  //       .updateProduct(this.productId, updatedProduct)
  //       .subscribe({
  //         next: () => {
  //           this.isEditing = false;
  //           this.getProductDetails(this.productId);
  //         },
  //         error: (err) => {
  //           console.error('Error updating product', err);
  //         },
  //       });
  //   }
  // }

  

}
