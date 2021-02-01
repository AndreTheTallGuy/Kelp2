package com.Kelp2.kelp.services;

import com.Kelp2.kelp.DAO.CommentRepo;
import com.Kelp2.kelp.models.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService{
    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    private CommentRepo commentRepo;

    @Autowired
    public CommentService(CommentRepo commentRepo){this.commentRepo = commentRepo;}

    public boolean saveComment(Comment comment){
        try{
            commentRepo.save(comment);
            return true;
        } catch (Exception e){
            logger.warn(e.getMessage());
            return false;
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
