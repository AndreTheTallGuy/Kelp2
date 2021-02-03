package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.CommentRepo;
import com.Kelp2.kelp.models.Comment;
import com.Kelp2.kelp.models.Review;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService{
    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    private CommentRepo commentRepo;

    @Autowired
    public CommentService(CommentRepo commentRepo){this.commentRepo = commentRepo;}

    public List<Comment> findAllByReviewID(int reviewID){return commentRepo.findByReviewID(reviewID);}

    public Comment saveComment(String json){
        ObjectMapper om = new ObjectMapper();
        Comment comment = null;
        try{
            comment = om.readValue(json, Comment.class);
            commentRepo.save(comment);
            return comment;
        } catch (JsonProcessingException e) {
            logger.warn(e.getMessage());
            return null;
        } catch (Exception e){
            logger.warn(e.getMessage());
            return null;
        }
    }

    public boolean changeVotes(int commentID, int vote){
        try{
            Comment comment = commentRepo.getOne(commentID);
            int oldVote = comment.getVotes();
            oldVote += vote;
            comment.setVotes(oldVote);
            return true;
        } catch (Exception e){
            logger.warn(e.getMessage());
            return false;
        }
    }
}
