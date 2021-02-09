package com.Kelp2.kelp.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;

@Entity
@Table(name="comments")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @Column(name="comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentID;

    @Column(name="review_id")
    private int reviewID;

    @Column(name="user_id")
    private int userID;

    @Column(name="reply_id")
    private int replyID;

    @Column(name="comment")
    private String comment;

    @Column(name="posted_date")
    private java.sql.Date postedDate;

    @Column(name="votes")
    private int votes;

}
