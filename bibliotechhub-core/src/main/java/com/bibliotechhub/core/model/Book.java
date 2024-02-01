package com.bibliotechhub.core.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Table
@Data
public class Book {
	
	@Id()
	@Column(nullable = false, unique = true)
	private String id;
	
	@PrePersist
	public void prePersist() {
		this.id = UUID.randomUUID().toString();
	}
	@Column(nullable = true)
	private String title;

	@Column(length = 4000, nullable = true)
	private String description;


	private String bookCategoryId;
	 private boolean isAvailable;



	

}
