import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: "User" ,
        required: true 
    } , 
    movieId: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: "Movie", 
        required: true 
    } , 
    review :{
        type: String , 
        trim: true ,
    } , 
    rating : {
        type: Number , 
        default:1 , 
        max:10 , 
        min:1 , 
        required: true 
    } , 
    
} , {timestamps: true}) 

// one user can write only one review on one movie
ratingAndReviewSchema.index( {
    userId: 1 , 
    movieId: 1
} , { unique : true })


export const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema)