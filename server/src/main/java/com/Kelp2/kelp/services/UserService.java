package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.UserRepo;
import com.Kelp2.kelp.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo){this.userRepo = userRepo;}

    public Optional<User> findUserByID(int id){
        return userRepo.findById(id);
    }

    public User findByDisplayName(String user){
        return userRepo.findUserByDisplayName(user);
    }

    public boolean updateUserInfoByID(User user){
        try{
            User oldInfo = userRepo.getOne(user.getID());
            oldInfo.setDisplayName(user.getDisplayName());
            oldInfo.setProfilePic(user.getProfilePic());
            oldInfo.setFishPersonality(user.getFishPersonality());
            oldInfo.setLocation(user.getLocation());
            oldInfo.setTwitter(user.getTwitter());
            oldInfo.setFacebook(user.getFacebook());
            oldInfo.setInstagram(user.getInstagram());
            oldInfo.setBio(user.getBio());
            return true;
        }catch (Exception e){
            logger.warn(e.getMessage());
            return false;
        }
    }

    public boolean saveUser(String json)  {
        ObjectMapper om = new ObjectMapper();
        System.out.println("in the service!!");
        User user = null;
        try {
            user = om.readValue(json, User.class);
        } catch (JsonProcessingException e) {
            logger.warn(e.getMessage());
        }

        try{
            if(user !=null) userRepo.save(user);
            return true;
        }
        catch (Exception e){
            logger.warn(e.getMessage());
            return false;
        }

    }

}
