package com.example.webshop.service;

import com.example.webshop.model.Bike;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BikeService {
    List<Bike> findByCategoryId(Long id);

    List<Bike> findAll();

    Bike findById(Long id);

    Bike save(Bike bike, MultipartFile file) throws IOException;

    Bike update(Long id, Bike bike) throws IOException;

    void deleteById(Long id);
}
