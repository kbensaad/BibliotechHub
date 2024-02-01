package com.bibliotechhub.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bibliotechhub.core.model.BookCategory;


public interface BookCategoryRepository  extends JpaRepository<BookCategory, String>  {
    // Custom queries can be added here if needed
}
