package com.example.webshop.service.impl;

import com.example.webshop.model.Bike;
import com.example.webshop.model.ShoppingCart;
import com.example.webshop.model.repository.BikeRepository;
import com.example.webshop.model.repository.ShoppingCartRepository;
import com.example.webshop.model.repository.UserRepository;
import com.example.webshop.model.user.User;
import com.example.webshop.service.IShoppingCartService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartServiceImpl implements IShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, UserRepository userRepository, BikeRepository bikeRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
    }

    //    @Override
//    public ShoppingCart findActiveShoppingCartByUsername(String userId) {
//        return null;
//    }
//
    @Override
    public List<ShoppingCart> findAllById(Long userId) {

        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findAll();
        List<ShoppingCart> shoppingCartItems = new ArrayList<ShoppingCart>();
        User user = new User();
        for (ShoppingCart shoppingCart : shoppingCarts) {
            user = shoppingCart.getUser();
            if (user != null) {
                if (user.getId() == userId) {
                    shoppingCartItems.add(shoppingCart);
                }
            }
        }
        return shoppingCartItems;
    }

//
//    @Override
//    public ShoppingCart createNewShoppingCart(String userId) {
//        return null;
//    }

    @Override
    public void addBikeToShoppingCart(Long userId, Long bikeId) {
        ShoppingCart shoppingCart = new ShoppingCart();
        Optional<Bike> bike = bikeRepository.findById(bikeId);
        Optional<User> user = userRepository.findById(userId);
        if (bike.isPresent()) {
            shoppingCart.setCreateDate(LocalDateTime.now());
            shoppingCart.setUser(user.get());
            shoppingCart.setBike(bike.get());
        }
        shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public void removeBikeFromShoppingCart(Long bikeId) {
        shoppingCartRepository.deleteById(bikeId);
    }

    @Override
    public void removeAllBikesFromShoppingCart() {
        shoppingCartRepository.deleteAll();
    }
//
//    @Override
//    public ShoppingCart getActiveShoppingCart(String userId) {
//        return null;
//    }
//
//    @Override
//    public ShoppingCart cancelActiveShoppingCart(String userId) {
//        return null;
//    }
}
