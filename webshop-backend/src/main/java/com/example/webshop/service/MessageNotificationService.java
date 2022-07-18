package com.example.webshop.service;

import com.example.webshop.model.MessageNotification;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MessageNotificationService {
    List<MessageNotification> findByCategoryId(Long id);

    List<MessageNotification> findAll();

    MessageNotification findById(Long id);

    MessageNotification save(MessageNotification messageNotification, MultipartFile file) throws IOException;

    MessageNotification update(Long id, MessageNotification messageNotification) throws IOException;

    void deleteById(Long id);
}
