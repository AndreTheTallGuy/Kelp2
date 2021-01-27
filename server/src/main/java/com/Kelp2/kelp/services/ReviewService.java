package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.ReviewRepo;
import com.Kelp2.kelp.models.Review;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    private static final Logger logger = LoggerFactory.getLogger(ReviewService.class);
    @Autowired
    private ReviewRepo reviewRepo;

    public ReviewService(ReviewRepo reviewRepo){this.reviewRepo = reviewRepo;}

    public Review findReviewByAquaID(int aquaID){
        return reviewRepo.FindByAquaID(aquaID);
    }

    public boolean saveReview(Review review){
        try{
            reviewRepo.save(review);
            return true;
        } catch (Exception e){
            logger.warn(e.getMessage());
            return false;
        }
    }

}
