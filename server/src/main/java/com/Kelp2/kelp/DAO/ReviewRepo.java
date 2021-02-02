package com.Kelp2.kelp.DAO;

import com.Kelp2.kelp.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {
    @Query(value = "SELECT * FROM review WHERE aquarium_id = ?1", nativeQuery = true)
    Review FindByAquaID(int aquaID);
}
