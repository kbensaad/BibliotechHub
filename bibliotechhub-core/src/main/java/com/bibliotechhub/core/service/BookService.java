package com.bibliotechhub.core.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bibliotechhub.core.model.Book;
import com.bibliotechhub.core.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookService  {

    @Autowired
    private BookRepository bookRepository;


    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

   
    public Book createBook(Book book) {
        // Additional validation or business logic can be added here
        return bookRepository.save(book);
    }

 
    public Book updateBook(Long id, Book updatedBook) {
        Optional<Book> existingBookOptional = bookRepository.findById(id);

        if (existingBookOptional.isPresent()) {
            Book existingBook = existingBookOptional.get();

            // Update fields as needed
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setCategory(updatedBook.getCategory());
            existingBook.setAvailable(updatedBook.isAvailable());

            // Save the updated book
            return bookRepository.save(existingBook);
        } else {
            return null; // Book not found
        }
    }

   
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
