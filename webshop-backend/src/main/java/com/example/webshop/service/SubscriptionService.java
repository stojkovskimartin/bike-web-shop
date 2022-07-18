package com.example.webshop.service;

import com.example.webshop.model.Subscription;

import java.util.List;

public interface SubscriptionService {
    List<Subscription> findAllById(Long userId);

    void addBikeToSubscription(Long userId, Long bikeId);

    void removeBikeFromSubscription(Long bikeId);

}
