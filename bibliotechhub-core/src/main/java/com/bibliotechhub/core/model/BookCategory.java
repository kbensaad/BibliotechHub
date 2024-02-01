package com.bibliotechhub.core.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table
@Data
public class BookCategory {

    @Id
    private String id;
	@Column(nullable = true)
	private String name;

	@Column(length = 4000, nullable = true)
	private String description;

	

}
