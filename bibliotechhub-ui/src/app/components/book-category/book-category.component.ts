import { Component, OnInit } from '@angular/core';
import { BookCategory } from 'src/app/models/BookCategory';
import { BookCategoryService } from 'src/app/services/book-category.services';


@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styles: []
})
export class BookCategoryComponent implements OnInit {

  selectedBookCategory: BookCategory;
  bookCategories: BookCategory[] = [];

  constructor(private bookCategoryService: BookCategoryService) { }

  ngOnInit() {
    this.bookCategoryService.getBookCategories()
      .subscribe(data => {
        this.bookCategories = data;
      });
      console.log( this.bookCategories)
  }

  changeBookCategory(bookCategory: BookCategory) {
    console.log("bookCategory", bookCategory)
    this.selectedBookCategory = bookCategory;
  }
}
