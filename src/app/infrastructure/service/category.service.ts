import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryRequest } from '../models/category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly URL = 'http://localhost:8080/categories';

  private categories: string[] = [
    'Dízimo',
    'Oferta',
    'Manutenção'
  ];

  constructor(private http: HttpClient) { }

  getAllCategories(groupId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.URL}/${groupId}`
    );
  }

  createCategory(payload: CategoryRequest): Observable<void> {
    this.categories.push(payload.name);
    return this.http.post<void>(
      this.URL,
      payload
    );
  }

  updateCategory(id: string, payload: CategoryRequest) {
    return this.http.put(`${this.URL}/${id}`, payload);
  }
}
