package com.bibliotechhub.core.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bibliotechhub.core.exceptions.DoesNotExistException;
import com.bibliotechhub.core.model.Book;
import com.bibliotechhub.core.service.BookService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/books")
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping("/{id}")
	public Book getBook(@PathVariable String id) throws DoesNotExistException {
		return bookService.getBook(id);
	}

	@GetMapping()
	public List<Book> searchForBooks(@RequestParam("bookCategoryId") Optional<String> bookCategoryId) {
		
		if (bookCategoryId.isPresent()) {
			return bookService.getBooksByBookCategory(bookCategoryId.get());
		}
		
		return bookService.getBooks();
	}

	@PostMapping()
	public Book createBook(@RequestParam("bookCategoryId") String bookCategoryId,
			@Valid @RequestBody Book book) {
		return bookService.createBook(bookCategoryId, book);
	}

	@PutMapping("/{id}")
	public Book updateBook(@PathVariable String id, @Valid @RequestBody Book book)
			throws DoesNotExistException {
		return bookService.updateBook(id, book);
	}
	
	@DeleteMapping("/{id}")
	public void deleteBook(@PathVariable String id) throws DoesNotExistException {
		 bookService.delete(id);

	}

}
