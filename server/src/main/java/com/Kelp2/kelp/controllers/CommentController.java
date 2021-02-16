package com.Kelp2.kelp.controllers;


import com.Kelp2.kelp.models.Comment;
import com.Kelp2.kelp.services.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/comment")
public class CommentController {
    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    private CommentService commentService;

    @Autowired
    public CommentController (CommentService commentService){this.commentService=commentService;}

    @GetMapping(path="/{reviewId}")
    public ResponseEntity<List<Comment>> getAllCommentsByReviewID(@PathVariable(name="reviewId") int reviewID){
        logger.info("Received request for Comments to Review by ID");
        List<Comment> allComments = commentService.findAllByReviewID(reviewID);
        return new ResponseEntity<>(allComments, HttpStatus.OK);
    }

    @PostMapping(path="/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Comment> submitComment(@RequestBody String json){
        logger.info("Submitting a Comment");
        Comment submittedComment = commentService.saveComment(json);
        return new ResponseEntity<>(submittedComment, HttpStatus.OK);
    }
}
