package com.example.webshop.service.impl;

import com.example.webshop.model.Bike;
import com.example.webshop.model.Subscription;
import com.example.webshop.model.repository.BikeRepository;
import com.example.webshop.model.repository.SubscriptionRepository;
import com.example.webshop.model.repository.UserRepository;
import com.example.webshop.model.user.User;
import com.example.webshop.service.SubscriptionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserRepository userRepository, BikeRepository bikeRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.bikeRepository = bikeRepository;
    }

    @Override
    public List<Subscription> findAllById(Long userId) {

        List<Subscription> subscriptions = subscriptionRepository.findAll();
        List<Subscription> subscriptionList = new ArrayList<Subscription>();
        User user = new User();
        for (Subscription subscription : subscriptions) {
            user = subscription.getUser();
            if (user != null) {
                if (user.getId() == userId) {
                    subscriptionList.add(subscription);
                }
            }
        }
        return subscriptionList;
    }

    @Override
    public void addBikeToSubscription(Long userId, Long bikeId) {
        Subscription subscription = new Subscription();
        Optional<Bike> bike = bikeRepository.findById(bikeId);
        Optional<User> user = userRepository.findById(userId);
        if (bike.isPresent()) {
            subscription.setUser(user.get());
            subscription.setBike(bike.get());
        }
        subscriptionRepository.save(subscription);
    }

    @Override
    public void removeBikeFromSubscription(Long bikeId) {
        subscriptionRepository.deleteById(bikeId);
    }

}
