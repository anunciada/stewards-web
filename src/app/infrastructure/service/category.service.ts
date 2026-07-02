import { Injectable } from '@angular/core';

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

  createCategory(category: string): void {
    if (!category.trim()) {
      return;
    }

    this.categories.push(category);
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