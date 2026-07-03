import { Injectable } from '@angular/core';
import { CreateCategoryRequest } from '../models/create-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: string[] = [
    'Dízimo',
    'Oferta',
    'Manutenção'
  ];

  constructor() { }

  getAllCategories(): string[] {
    return this.categories;
  }

  createCategory(payload: CreateCategoryRequest): void {
    console.log('Enviando para backend', payload);
    // return this.httpClientWrapper.post(...);
    this.categories.push(payload.categoryName);
  }
}
/*
getAllCategories() {
  return this.httpClientWrapper.get(...);
}

createCategory(category: string) {
  return this.httpClientWrapper.post(...);
}
*/