package com.example.webshop.controller;

import com.example.webshop.model.WishList;
import com.example.webshop.service.WishListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/wish")
public class WishListController {

    private final WishListService wishListService;

    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findById/{userId}")
    public List<WishList> findAllByLoggedUserId(@PathVariable Long userId) {
        return this.wishListService.findAllById(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{userId}/{bikeId}/bikes")
    public void addBikeToWishList(@PathVariable Long userId, @PathVariable Long bikeId) {
        wishListService.addBikeToWishList(userId, bikeId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{bikeId}/bikes")
    public void removeBikeFromCart(@PathVariable Long bikeId) {
        this.wishListService.removeBikeFromWishList(bikeId);
    }
}