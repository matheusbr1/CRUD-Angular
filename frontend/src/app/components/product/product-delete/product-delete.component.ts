import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  product: Product = {
    name: '',
    price: null
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id as string).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.delete(id as string).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso')
      this.router.navigate(['/products/'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
