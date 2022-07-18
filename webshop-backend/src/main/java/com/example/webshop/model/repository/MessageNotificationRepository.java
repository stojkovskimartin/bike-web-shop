package com.example.webshop.model.repository;

import com.example.webshop.model.MessageNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageNotificationRepository extends JpaRepository<MessageNotification, Long> {
}
