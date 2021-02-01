package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.AquariumRepo;
import com.Kelp2.kelp.models.Aquarium;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AquariumService {
    private static final Logger logger = LoggerFactory.getLogger(AquariumService.class);

    private AquariumRepo aquariumRepo;

    @Autowired
    public AquariumService(AquariumRepo aquariumRepo){this.aquariumRepo = aquariumRepo;}

    public Page<Aquarium> findAll(int page, int size){
        return aquariumRepo.findAll(PageRequest.of(page,size));
    }

    public Optional<Aquarium> findByID(int aquaID){
        return aquariumRepo.findById(aquaID);
    }
}
