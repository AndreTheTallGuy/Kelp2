export interface Review{
    reviewID?: number;
    aquariumID?: number;
    userID?: number;
    rating?: number;
    reviewText?: string;
    visitedDate?: Date;
    postedDate?: string;
    upvotes?: number[];
    downvotes?: number[];
    signage?: number;
}