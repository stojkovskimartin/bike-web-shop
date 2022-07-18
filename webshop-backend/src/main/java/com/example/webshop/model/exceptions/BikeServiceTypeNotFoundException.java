package com.example.webshop.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BikeServiceTypeNotFoundException extends RuntimeException{
    public BikeServiceTypeNotFoundException(Long id) {
        super(String.format("Manufacturer with id %d is not found", id));

    }
}
