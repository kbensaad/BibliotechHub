import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Book } from '../models/Book';



const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/api/books";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient, 
    private datePipe: DatePipe) { }

  getBooksByBookCategory(bookCategoryId: string): Observable<Book[]> {
    const params = new HttpParams().set('bookCategoryId', bookCategoryId);
    return this.http.get<Book[]>(apiUrl, {headers, params});
  }

  /*getEffectiveBooksBybookCategoryOnDate(bookCategoryId: string, date: Date): Observable<Book[]> {
    const params = new HttpParams().set('bookCategoryId', bookCategoryId).append('date', this.datePipe.transform(date, 'yyyy-MM-dd'));
    return this.http.get<Book[]>(apiUrl, {headers, params});
  }
*/
  createBook (bookCategoryId: string, book: Book): Observable<Book> {
    const params = new HttpParams().set('bookCategoryId', bookCategoryId);
    return this.http.post<Book>(apiUrl, book, {headers, params});
  }
  
  updateBook (id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${apiUrl}/${id}`, book, {headers});
  }
  deleteBook (id: string) {
    return this.http.delete<Book>(`${apiUrl}/${id}`, {headers});
  }
}
