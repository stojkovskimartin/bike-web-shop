package com.example.webshop.model;

import com.example.webshop.model.user.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class MessageNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @ManyToOne
    @JoinColumn(name = "bike_id")
    private Bike bike;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}