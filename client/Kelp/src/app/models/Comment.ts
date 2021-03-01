export interface Comment{
    commentID?: number;
    reviewID?: number;
    userID?: number;
    replyID?: number;
    comment?: string;
    postedDate?: string;
    upvotes?: number[];
    downvotes?: number[];
    margin?: number;
}