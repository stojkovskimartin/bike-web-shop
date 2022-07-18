package com.example.webshop.service.impl;

import com.example.webshop.model.Bike;
import com.example.webshop.model.Subscription;
import com.example.webshop.model.WishList;
import com.example.webshop.model.repository.BikeRepository;
import com.example.webshop.model.repository.UserRepository;
import com.example.webshop.model.repository.WishListRepository;
import com.example.webshop.model.user.User;
import com.example.webshop.service.WishListService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    public WishListServiceImpl(WishListRepository wishListRepository, UserRepository userRepository, BikeRepository bikeRepository) {
        this.wishListRepository = wishListRepository;
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
    }

    @Override
    public List<WishList> findAllById(Long userId) {

        List<WishList> wishLists = wishListRepository.findAll();
        List<WishList> wishListTest = new ArrayList<WishList>();
        User user = new User();
        for (WishList wishList : wishLists) {
            user = wishList.getUser();
            if (user != null) {
                if (user.getId() == userId) {
                    wishListTest.add(wishList);
                }
            }
        }
        return wishListTest;
    }

    @Override
    public void addBikeToWishList(Long userId, Long bikeId) {
        WishList w = new WishList();
        Optional<Bike> bike = bikeRepository.findById(bikeId);
        Optional<User> user = userRepository.findById(userId);
        if (bike.isPresent()) {
            w.setUser(user.get());
            w.setBike(bike.get());
        }
        wishListRepository.save(w);
    }

    @Override
    public void removeBikeFromWishList(Long bikeId) {
        wishListRepository.deleteById(bikeId);
    }

}
