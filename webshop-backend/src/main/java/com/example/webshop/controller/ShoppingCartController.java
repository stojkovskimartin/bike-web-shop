package com.example.webshop.controller;

import com.example.webshop.model.Bike;
import com.example.webshop.model.ShoppingCart;
import com.example.webshop.model.repository.BikeRepository;
import com.example.webshop.model.repository.ShoppingCartRepository;
import com.example.webshop.model.user.User;
import com.example.webshop.service.IShoppingCartService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    private final IShoppingCartService IShoppingCartService;
    private final ShoppingCartRepository shoppingCartRepository;
    private final BikeRepository bikeRepository;

    public ShoppingCartController(IShoppingCartService IShoppingCartService, ShoppingCartRepository shoppingCartRepository, BikeRepository bikeRepository) {
        this.IShoppingCartService = IShoppingCartService;
        this.shoppingCartRepository = shoppingCartRepository;
        this.bikeRepository = bikeRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findById/{userId}")
    public List<ShoppingCart> findAllByLoggedUserId(@PathVariable Long userId) {
        return this.IShoppingCartService.findAllById(userId);
    }

    //    @PostMapping
//    public ShoppingCart createNewShoppingCart() {
//        return this.IShoppingCartService.createNewShoppingCart(this.authService.getCurrentUserId());
//    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{userId}/{bikeId}/bikes")
    public void addBikeToCart(@PathVariable Long userId, @PathVariable Long bikeId) {
        IShoppingCartService.addBikeToShoppingCart(userId, bikeId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{bikeId}/bikes")
    public void removeBikeFromCart( @PathVariable Long bikeId) {
       this.IShoppingCartService.removeBikeFromShoppingCart(bikeId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/bikes/{id}/{userId}")
    public void removeAllBikesFromCart(@PathVariable("id") Long id, @PathVariable("userId") Long userId) {
        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findAll();
//        List<ShoppingCart> shoppingCartsList = shoppingCartRepository.findAllById(userId);

        List<Long> ids = new ArrayList<>();

        for(int i=0; i<shoppingCarts.size(); i++){
            if(shoppingCarts.get(i).getUser().getId() == userId){
                this.shoppingCartRepository.deleteAll();
            }
        }
    }
//
//    @PatchMapping("/cancel")
//    public ShoppingCart cancelActiveShoppingCart() {
//        return this.IShoppingCartService.cancelActiveShoppingCart(this.authService.getCurrentUserId());
//    }
}
