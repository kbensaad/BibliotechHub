import { Component, OnChanges, SimpleChange, Input, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/UserInfo';
import { AlertService } from 'src/app/services/alert.service';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.services';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: []
})
export class BookComponent implements OnChanges, OnInit {

  @Input() bookCategoryId: string;
  @Input() bookCategoryName: string;

  modalRef: BsModalRef;

  books: Book[] = [];
  selectedBook: Book;
  bookForm: FormGroup;
  orderForm: FormGroup;
  user$: Observable<UserInfo>;

  constructor(
    private bookService: BookService, 
    private formBuilder: FormBuilder,
    private modalService: BsModalService, 
    private userStore: UserStore,
    private alertService: AlertService) { 
      this.userStore.init();
    }

  async ngOnInit() {
    this.user$ = this.userStore.getAll$();
    console.log( ' this.user$',this.user$);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['bookCategoryId']) {
      this.getBooksByBookCategory(this.bookCategoryId);
    }
  }

  getBooksByBookCategory(id: string) {
    this.bookService.getBooksByBookCategory(id)
      .subscribe(data => {
        this.books = data;
      });
  }

  openAddBookModal(template: TemplateRef<any>) {
    this.bookForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openDeleteBookModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openEditBookModal(template: TemplateRef<any>, book: Book) {  
    this.bookForm = this.formBuilder.group({
      'id' : book.id,
      'bookCategoryId': book.bookCategoryId,
      'title' : [book.title, Validators.required],
      'description' : [book.description, Validators.required]
      
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }
  
  openCreateOrderModal(template: TemplateRef<any>, book: Book) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(new Date(), p);
    this.orderForm = this.formBuilder.group({
      'book' : [{value: book.title, disabled: true}],
      'bookCategory' : [{value: this.bookCategoryName, disabled: true}],
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.bookForm.controls; 
  }

  onAddBook() {
    // stop here if form is invalid
    if (this.bookForm.invalid) {
      return;
    }
    let book = <Book>this.bookForm.value;
    book.bookCategoryId = this.bookCategoryId;
    this.bookService.createBook(this.bookCategoryId, book)
      .subscribe(res => {
          this.getBooksByBookCategory(this.bookCategoryId);
          this.modalRef.hide();
          this.alertService.success(`Added ${book.title} book.`);
        });
  };

  onUpdateBook() {
    // stop here if form is invalid
    if (this.bookForm.invalid) {
      return;
    }
    let book = <Book>this.bookForm.value;
    this.bookService.updateBook(book.id, book)
      .subscribe(res => {
          this.getBooksByBookCategory(this.bookCategoryId);
          this.modalRef.hide();
          this.alertService.success(`Updated ${book.title} book.`);
        });
  };

  onDeleteBook(book: Book) {
    
    this.bookService.deleteBook(book.id)
    .subscribe(res => {
      this.getBooksByBookCategory(this.bookCategoryId);
      this.selectedBook = {} as Book;
      this.modalRef.hide();
      this.alertService.success(`Deleted ${book.title} book.`);
    });
  }



}
