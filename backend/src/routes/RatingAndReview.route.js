import express from 'express' ; 
import userAuth from '../middlewares/user.middleware.js';
import { createReview, deleteReview, getAllReviews, getMyReview, updateReview } from '../controllers/RatingAndReview.controller.js';

const reviewRouter = express.Router() ; 

reviewRouter.post('/create' , userAuth , createReview ) ; 
reviewRouter.get('/all-Reviews/:movieId' , userAuth , getAllReviews )  ; 
reviewRouter.get('/my-reviews' , userAuth , getMyReview ) ; 
reviewRouter.put('/:reviewId' , userAuth , updateReview ) ; 
reviewRouter.delete('/delete/:reviewId' , userAuth , deleteReview ) ; 

export default reviewRouter ; 