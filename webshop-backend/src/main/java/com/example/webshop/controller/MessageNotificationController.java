package com.example.webshop.controller;

import com.example.webshop.model.MessageNotification;
import com.example.webshop.model.ShoppingCart;
import com.example.webshop.model.repository.MessageNotificationRepository;
import com.example.webshop.model.repository.ShoppingCartRepository;
import com.example.webshop.model.repository.UserRepository;
import org.aspectj.bridge.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/message")
public class MessageNotificationController {

    private final UserRepository userRepository;
    private final MessageNotificationRepository messageNotificationRepository;

    public MessageNotificationController(UserRepository userRepository, MessageNotificationRepository messageNotificationRepository) {
        this.userRepository = userRepository;
        this.messageNotificationRepository = messageNotificationRepository;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allMessages")
    public List<MessageNotification> getAllMessages() {
        return messageNotificationRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}/messageById")
    public Optional<MessageNotification> getMessageById(@PathVariable("id") Long id) {
        return messageNotificationRepository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}/deleteById")
    public ResponseEntity<HttpStatus> deleteMessageById(@PathVariable("id") Long id) {
        try {
            messageNotificationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteAll/{userId}")
    public ResponseEntity<HttpStatus> deleteAllMessages(@PathVariable("userId") Long userId) {
        try {
            List<MessageNotification> messageNotifications = messageNotificationRepository.findAll();

            for (int i = 0; i < messageNotifications.size(); i++) {
                if (messageNotifications.get(i).getUser().getId() == userId) {
                    messageNotificationRepository.deleteAll();
                }
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}
