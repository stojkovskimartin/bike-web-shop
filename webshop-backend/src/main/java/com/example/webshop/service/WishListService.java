package com.example.webshop.service;

import com.example.webshop.model.WishList;

import java.util.List;

public interface WishListService {
    List<WishList> findAllById(Long userId);

    void addBikeToWishList(Long userId, Long bikeId);

    void removeBikeFromWishList(Long bikeId);

}
