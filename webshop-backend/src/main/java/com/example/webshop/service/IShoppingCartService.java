package com.example.webshop.service;


import com.example.webshop.model.ShoppingCart;

import java.util.List;

public interface IShoppingCartService {

    //    ShoppingCart findActiveShoppingCartByUsername(String userId);
//
    List<ShoppingCart> findAllById(Long userId);
//
//    ShoppingCart createNewShoppingCart(String userId);

    void addBikeToShoppingCart(Long userId, Long bikeId);

    void removeBikeFromShoppingCart(Long bikeId);
    void removeAllBikesFromShoppingCart();
//
//    ShoppingCart getActiveShoppingCart(String userId);
//
//    ShoppingCart cancelActiveShoppingCart(String userId);

}
