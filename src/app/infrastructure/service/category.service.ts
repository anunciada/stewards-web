import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCategoryRequest } from '../models/create-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly URL = 'http://localhost:8081/categories';

  private categories: string[] = [
    'Dízimo',
    'Oferta',
    'Manutenção'
  ];

  constructor(private http: HttpClient) { }

  getAllCategories(): string[] {
    return this.categories;
  }

  createCategory(payload: CreateCategoryRequest): Observable<void> {
    //console.log('Enviando para backend', payload);
    this.categories.push(payload.name);
    return this.http.post<void>(
      this.URL,
      payload
    );
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