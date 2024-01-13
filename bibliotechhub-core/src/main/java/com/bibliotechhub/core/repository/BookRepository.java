package com.bibliotechhub.core.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bibliotechhub.core.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom queries can be added here if needed
}
