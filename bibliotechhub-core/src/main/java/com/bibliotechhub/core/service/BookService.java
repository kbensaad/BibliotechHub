package com.bibliotechhub.core.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bibliotechhub.core.exceptions.DoesNotExistException;
import com.bibliotechhub.core.model.Book;
import com.bibliotechhub.core.repository.BookRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService  {

    @Autowired
    private BookRepository bookRepository;


    public Book getBook(String id) throws DoesNotExistException {
		Optional<Book> book = bookRepository.findById(id);
		if (!book.isPresent()) {
			throw new DoesNotExistException("Book");
		}
		return book.get();
	}

	public List<Book> getBooksByBookCategory(String bookCategoryId) {
		List<Book> list = new ArrayList<>();
		bookRepository.findByBookCategoryId(bookCategoryId).forEach(e -> list.add(e));
		return list;
	}



	public List<Book> getBooks() {
		List<Book> list = new ArrayList<>();
		bookRepository.findAll().forEach(e -> list.add(e));
		return list;
	}

	

	public Book createBook(String bookCategoryId, Book book) {
		book.setBookCategoryId(bookCategoryId);
		return bookRepository.save(book);
	}

	public Book updateBook(String id, Book book) throws DoesNotExistException {
		this.getBook(id);
		return bookRepository.save(book);
	}
	public void delete(String id) throws DoesNotExistException {
		 bookRepository.deleteById(id);
	}

}
