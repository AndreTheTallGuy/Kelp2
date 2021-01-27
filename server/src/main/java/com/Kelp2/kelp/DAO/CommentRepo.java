package com.Kelp2.kelp.DAO;

import com.Kelp2.kelp.models.Comment;
import com.sun.tools.javac.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
    public List<Comment> findAllByReviewID(int reviewID);
}
