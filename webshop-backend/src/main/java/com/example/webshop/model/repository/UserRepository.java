package com.example.webshop.model.repository;

import com.example.webshop.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  User findByIdAndUsername(Long id, String username);
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
