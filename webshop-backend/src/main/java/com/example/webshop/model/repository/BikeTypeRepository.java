package com.example.webshop.model.repository;

import com.example.webshop.model.BikeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeTypeRepository extends JpaRepository<BikeType, Long> {
}
