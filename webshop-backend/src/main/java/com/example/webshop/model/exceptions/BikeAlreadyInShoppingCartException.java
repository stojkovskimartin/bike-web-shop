package com.example.webshop.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class BikeAlreadyInShoppingCartException extends RuntimeException{

    public BikeAlreadyInShoppingCartException(Long id, String username) {
        super(String.format("Bike with id: %d already exists in shopping cart for user with username %s", id, username));
    }
}
