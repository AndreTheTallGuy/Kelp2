package com.Kelp2.kelp.DAO;

import com.Kelp2.kelp.models.Aquarium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AquariumRepo extends JpaRepository<Aquarium, Integer> {
}
