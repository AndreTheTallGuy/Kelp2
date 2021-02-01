package com.Kelp2.kelp.controllers;


import com.Kelp2.kelp.models.User;
import com.Kelp2.kelp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController (UserService userService){this.userService = userService;}

    @GetMapping(path="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Optional<User>> getUserByID(@PathVariable(name="id") int id){
        logger.info("Received request for User by ID");
        Optional<User> calledUser = userService.findUserByID(id);
        return new ResponseEntity<>(calledUser, HttpStatus.OK);
    }

    @GetMapping(path="/{displayName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUserByDisplayName(@PathVariable(name="displayName") String name){
        logger.info("Received request for User by Display Name");
        User calledUser = userService.findByDisplayName(name);
        return new ResponseEntity<>(calledUser, HttpStatus.OK);
    }

    @PutMapping(path="/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> updateUserInfo(@RequestBody User user){
        logger.info("Updating info for requested User");
        boolean updatedUser = userService.updateUserInfoByID(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping(path="/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> createUser(@RequestBody User user){
        logger.info("Creating User");
        boolean createdUser = userService.saveUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

}
