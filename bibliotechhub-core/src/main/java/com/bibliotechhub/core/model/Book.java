package com.bibliotechhub.core.model;

import com.bibliotechhub.core.enums.Categories;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity(name = "Book")
@Table(name = "book")
@JsonIgnoreProperties("inspection")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;

	private Categories category;
	
	private boolean isAvailable;
	
}
