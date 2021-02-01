package com.Kelp2.kelp.DAO;

import com.Kelp2.kelp.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {
    public Review FindByAquaID(int aquaID);
}
