package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.UserRepo;
import com.Kelp2.kelp.models.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
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

    public User findUserByID(int id){
        return userRepo.getOne(id);
    }

    public User findByUserName(String user){
        return userRepo.findUserByUserName(user);
    }

    public User findByEmail(String user){
        return userRepo.findUserByEmail(user);
    }

    public User updateUserInfoByID(String json){
        try{
            ObjectMapper om = new ObjectMapper();
            User user = null;
            user=om.readValue(json,User.class);

            User oldInfo = userRepo.getOne(user.getID());
            oldInfo.setUserName(user.getUserName());
            oldInfo.setProfilePic(user.getProfilePic());
            oldInfo.setFishPersonality(user.getFishPersonality());
            oldInfo.setLocation(user.getLocation());
            oldInfo.setTwitter(user.getTwitter());
            oldInfo.setFacebook(user.getFacebook());
            oldInfo.setInstagram(user.getInstagram());
            oldInfo.setBio(user.getBio());
            oldInfo.setEmail(user.getEmail());

            userRepo.save(oldInfo);

            return oldInfo;
        }catch (Exception e){
            logger.warn(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public User saveUser(String json)  {
        ObjectMapper om = new ObjectMapper();
        System.out.println("in the service!!");
        User user = null;
        try {
            user = om.readValue(json, User.class);
            if(user !=null) userRepo.save(user);
            return user;
        } catch (JsonProcessingException e) {
            logger.warn(e.getMessage());
            return null;
        } catch (Exception e){
            logger.warn(e.getMessage());
            return null;
        }

    }

}
