package com.example.webshop.service.impl;

import com.example.webshop.model.Brand;
import com.example.webshop.model.exceptions.BrandNotFoundException;
import com.example.webshop.model.repository.BrandRepository;
import com.example.webshop.service.BrandService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }


    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(Long id) {
        return this.brandRepository.findById(id).orElseThrow(() ->new BrandNotFoundException(id));
    }

    @Override
    public Brand save(Brand brand) {
        return this.brandRepository.save(brand);
    }

    @Override
    public Brand update(Long id, Brand brand) {
        Brand updatedBrand = this.findById(id);
        updatedBrand.setBrandName(brand.getBrandName());
        updatedBrand.setId(brand.getId());
        return this.brandRepository.save(updatedBrand);
    }

    @Override
    public void deleteById(Long id) {
        this.brandRepository.removeById(id);
    }
}
