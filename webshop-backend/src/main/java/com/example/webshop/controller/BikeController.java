package com.example.webshop.controller;

import com.example.webshop.model.Bike;
import com.example.webshop.model.BikeStatus;
import com.example.webshop.model.MessageNotification;
import com.example.webshop.model.WishList;
import com.example.webshop.model.repository.BikeRepository;
import com.example.webshop.model.repository.MessageNotificationRepository;
import com.example.webshop.model.repository.UserRepository;
import com.example.webshop.model.repository.WishListRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class BikeController {

    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final WishListRepository wishListRepository;
    private final MessageNotificationRepository messageNotificationRepository;

    public BikeController(BikeRepository bikeRepository, UserRepository userRepository, WishListRepository wishListRepository, MessageNotificationRepository messageNotificationRepository) {
        this.bikeRepository = bikeRepository;
        this.userRepository = userRepository;
        this.wishListRepository = wishListRepository;
        this.messageNotificationRepository = messageNotificationRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bikes")
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/bikes/{id}")
    public Optional<Bike> getBikeById(@PathVariable("id") Long id) {
        return bikeRepository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/bikes")
    public ResponseEntity<Bike> createBike(@RequestBody Bike bike) throws IOException {
//        if (bike.getData() != null) {
//            byte[] bytes = bike.getData();
//            String base64Image = String.format("data:%s;base64,%s",  Base64.getEncoder().encodeToString(bytes));
////            product.setImage(image);
//            bike.setImageBase64(base64Image);
//        }
        try {
            Bike bike1 = new Bike();
            bike1.setBikeName(bike.getBikeName());
            bike1.setPrice(bike.getPrice());
            bike1.setDescriptionBrand(bike.getDescriptionBrand());
            bike1.setDescriptionType(bike.getDescriptionType());
            bike1.setBrandName(bike.getBrandName());
            bike1.setTypeName(bike.getTypeName());
            bike1.setQuantity(bike.getQuantity());
            bike1.setBikeStatus(bike.getBikeStatus());
            bike1.setImage(bike.getImage());

            Bike bike2 = bikeRepository.save(bike1);
            return new ResponseEntity<>(bike2, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // update bike rest api
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/bikes/{id}/{userId}")
    public ResponseEntity<Bike> updateBike(@PathVariable("id") Long id, @RequestBody Bike bikeDetails, @PathVariable("userId") Long userId) throws IOException {
        Optional<Bike> bikeData = bikeRepository.findById(id);

        List<WishList> bikeInWishList = new ArrayList<>();

        List<WishList> wishListBikes = wishListRepository.findAll();

        if(bikeDetails.getBikeStatus() == BikeStatus.SOLD)
        {
            for(int i = 0; i < wishListBikes.size(); i++)
            {
                if(wishListBikes.get(i).getUser().getId() == userId)
                {
                    bikeInWishList.add(wishListBikes.get(i));
                }
            }
        }

       if(wishListBikes.size() > 0)
       {
           for(int i = 0; i < wishListBikes.size(); i++)
           {
               if(bikeData.get().getId() == wishListBikes.get(i).getBike().getId())
               {
                   MessageNotification messageNotification = new MessageNotification();
                   messageNotification.setBike(wishListBikes.get(i).getBike());
                   messageNotification.setUser(wishListBikes.get(i).getUser());
                   messageNotification.setMessage("the bike is already sold.");

                   messageNotificationRepository.save(messageNotification);
               }
           }
       }

        if (bikeData.isPresent()) {
            Bike bike = bikeData.get();
            bike.setBikeName(bikeDetails.getBikeName());
            bike.setPrice(bikeDetails.getPrice());

            bike.setBrandName(bikeDetails.getBrandName());
            bike.setDescriptionBrand(bikeDetails.getDescriptionBrand());

            bike.setTypeName(bikeDetails.getTypeName());
            bike.setDescriptionType(bikeDetails.getDescriptionType());

            bike.setQuantity(bikeDetails.getQuantity());
            bike.setBikeStatus(bikeDetails.getBikeStatus());

            bike.setImage(bikeDetails.getImage());


            return new ResponseEntity<>(bikeRepository.save(bike), HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/bikes/{id}")
    public ResponseEntity<HttpStatus> deleteBike(@PathVariable("id") Long id) {
        try {
            bikeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/bikes")
    public ResponseEntity<HttpStatus> deleteAllBikes() {
        try {
            bikeRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
}
