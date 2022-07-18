package com.example.webshop.service.impl;

import com.example.webshop.model.BikeType;
import com.example.webshop.model.exceptions.BikeServiceTypeNotFoundException;
import com.example.webshop.model.repository.BikeTypeRepository;
import com.example.webshop.service.BikeServiceType;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class BikeServiceTypeImpl implements BikeServiceType {

    private final BikeTypeRepository bikeTypeRepository;

    public BikeServiceTypeImpl(BikeTypeRepository bikeTypeRepository) {
        this.bikeTypeRepository = bikeTypeRepository;
    }


    @Override
    public List<BikeType> findAll() {
        return this.bikeTypeRepository.findAll();
    }

    @Override
    public BikeType findById(Long id) {
        return this.bikeTypeRepository.findById(id).orElseThrow(() -> new BikeServiceTypeNotFoundException(id));
    }

    @Override
    public BikeType save(BikeType bikeType) {
        BikeType bikeType1 = new BikeType();
        bikeType1.setTypeName(bikeType.getTypeName());
//        if (image != null) {
//            byte[] imageBytes = image.getBytes();
//            String test = String.format("data:%s;base64,%s", image.getContentType(), Base64.getEncoder().encodeToString(imageBytes));
//            bike.setImage(test);
//        }
        return this.bikeTypeRepository.save(bikeType);
    }

    @Override
    public BikeType update(Long id, BikeType bikeType) {
        BikeType bikeType1 = this.findById(id);
        bikeType1.setTypeName(bikeType.getTypeName());
        bikeType1.setId(bikeType.getId());

        return this.bikeTypeRepository.save(bikeType1);
    }

    @Override
    public void deleteById(Long id) {
        this.bikeTypeRepository.deleteById(id);
    }
}
