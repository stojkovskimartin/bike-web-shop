package com.example.webshop.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

@Entity
@Data
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, message = "*Bike name is required")
    private String bikeName;

    @NotNull
    @PositiveOrZero(message = "*You entered a negative number")
    private Long price;

    private String brandName;

    private String descriptionBrand;

    private String typeName;

    private String descriptionType;

    private Long quantity;

    private String image;

    @Enumerated(EnumType.STRING)
    private BikeStatus bikeStatus;

    public Bike() {
    }

    public Bike(String bikeName, Long price, String brandName, String descriptionBrand, String typeName, String descriptionType, Long quantity) {
    }

}