package com.bibliotechhub.core.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bibliotechhub.core.exceptions.DoesNotExistException;
import com.bibliotechhub.core.model.BookCategory;
import com.bibliotechhub.core.repository.BookCategoryRepository;

@Component
public class BookCategoryService {

	@Autowired
	private BookCategoryRepository bookCategoryRepository ;

	public BookCategory getBookCategory(String id) throws DoesNotExistException {
		Optional<BookCategory> bookCategory = bookCategoryRepository.findById(id);
		if (!bookCategory.isPresent()) {
			throw new DoesNotExistException("Book Category");
		}
		return bookCategory.get();
	}

	public List<BookCategory> getBookCategories() {
		List<BookCategory> list = new ArrayList<>();
		bookCategoryRepository.findAll().forEach(e -> list.add(e));
		return list;
	}

	public BookCategory createBookCategory(BookCategory bookCategory) {
		return bookCategoryRepository.save(bookCategory);
	}

	public BookCategory updateBookCategory(String id, BookCategory bookCategory) throws DoesNotExistException {
		this.getBookCategory(id);
		return bookCategoryRepository.save(bookCategory);
	}
}
