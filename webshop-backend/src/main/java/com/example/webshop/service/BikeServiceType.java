package com.example.webshop.service;

import com.example.webshop.model.BikeType;

import java.util.List;

public interface BikeServiceType {
    List<BikeType> findAll();

    BikeType findById(Long id);

    BikeType save(BikeType bikeType);

    BikeType update(Long id, BikeType bikeType);

    void deleteById(Long id);
}
