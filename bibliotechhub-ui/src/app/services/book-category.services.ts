import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookCategory } from '../models/BookCategory';



const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/api/bookcategories";

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {

  constructor(private http: HttpClient) { }

  getBookCategories (): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(apiUrl, {headers});
  }
  
  getBookCategory(id: string): Observable<BookCategory> {
    return this.http.get<BookCategory>(`${apiUrl}/${id}`, {headers});
  }
  
  createBookCategory (bookCategory: BookCategory): Observable<BookCategory> {
    return this.http.post<BookCategory>(apiUrl, bookCategory, {headers});
  }
  
  updateBookCategory (id: string, bookCategory: BookCategory): Observable<BookCategory> {
    return this.http.put<BookCategory>(`${apiUrl}/${id}`, bookCategory, {headers});
  }

}
