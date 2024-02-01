package com.bibliotechhub.core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bibliotechhub.core.exceptions.DoesNotExistException;
import com.bibliotechhub.core.model.BookCategory;
import com.bibliotechhub.core.service.BookCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/bookcategories", produces = MediaType.APPLICATION_JSON_VALUE)
public class BookCategoryController {


	@Autowired
	private BookCategoryService bookCategoryService;

	@GetMapping("/{id}")
	public BookCategory getBookCategory(@PathVariable String id) throws DoesNotExistException {
		return bookCategoryService.getBookCategory(id);
	}

	@GetMapping()
	public List<BookCategory> getBookCategories() {
		return bookCategoryService.getBookCategories();
	}

	@PostMapping()
	public BookCategory createBookCategory(@Valid @RequestBody BookCategory bookCategory) {
		return bookCategoryService.createBookCategory(bookCategory);
	}

	@PutMapping("/{id}")
	public BookCategory updateBookCategory(@PathVariable String id,
			@Valid @RequestBody BookCategory bookCategory) throws DoesNotExistException {
		return bookCategoryService.updateBookCategory(id, bookCategory);
	}


}
