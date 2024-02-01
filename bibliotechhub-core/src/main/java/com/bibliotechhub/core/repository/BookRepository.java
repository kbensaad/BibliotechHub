package com.bibliotechhub.core.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.bibliotechhub.core.model.Book;

public interface BookRepository extends JpaRepository<Book, String> {
	List<Book> findByBookCategoryId(String bookCategoryId);


}
