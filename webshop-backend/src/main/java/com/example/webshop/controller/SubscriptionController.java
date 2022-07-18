package com.example.webshop.controller;

import com.example.webshop.model.Subscription;
import com.example.webshop.service.SubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/sub")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findById/{userId}")
    public List<Subscription> findAllByLoggedUserId(@PathVariable Long userId) {
        return this.subscriptionService.findAllById(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{userId}/{bikeId}/bikes")
    public void addBikeToSubscribe(@PathVariable Long userId, @PathVariable Long bikeId) {
        subscriptionService.addBikeToSubscription(userId, bikeId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{bikeId}/bikes")
    public void removeBikeFromCart(@PathVariable Long bikeId) {
        this.subscriptionService.removeBikeFromSubscription(bikeId);
    }

}
