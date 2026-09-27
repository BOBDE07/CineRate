import { Movie } from "../models/movie.model.js";
import { RatingAndReview } from "../models/RatingAndReview.model.js";
import { User } from "../models/user.model.js";

const createReview = async(req , res ) =>{
    try {
        const {  movieId , rating , review } = req.body ;

        const userId = req.user._id;

        // Validate fields
        if (!movieId || rating === undefined || !review) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const movie = await Movie.findById(movieId) ; 
        if(!movie) {
            return res.status(404).json({
                success: false , 
                message : "Movie not found"
            }) ;
        }

        // if user already review the movie 
        const alreadyReviewed = await RatingAndReview.findOne({
            userId: userId , 
            movieId: movieId
        }) 
        
        if(alreadyReviewed) {
            return res.status(409).json({
                success: false , 
                message: "Movie is already reviewed by the user"
            }) ;
        }

        // create the review 
        const newReview = await RatingAndReview.create({
            userId , 
            movieId , 
            review , 
            rating  
        }) ; 

        return res.status(201).json({
            success: true ,  
            message: 'User reviewed the movie' ,
            newReview
        }) ; 
        

    } catch (error) {
        console.log('Error while reviewing the movie: ', error) ; 
        return res.status(500).json({
            success: false , 
            message: 'Internal server error' 
        }) ; 
    }

}

const getAllReviews = async(req, res) => {
    try {
        const movieId = req.params.movieId ; 

        const movie = await Movie.findById(movieId) ; 

        if(!movie) {
            return res.status(404).json({
                success: false , 
                message: 'Movie not found'
            }) ; 
        }

        // fetch all reviews of movie 
        const allReviews = await RatingAndReview.find({
            movieId
        }).populate("userId" ,"fullName") ; 

        // calculate the average 
        const totalReviews = allReviews.length ; 
        let totalRating = 0 ; 
        
        allReviews.forEach(review => {
            totalRating += review.rating
        })

        const avgRating = totalReviews > 0 ? totalRating / totalReviews: 0 ; 

        return res.status(200).json({
            success: true , 
            message: 'All reviews fectched' , 
            allReviews , 
            totalRating , 
            totalReviews , 
            avgRating 
        })
    } catch (error) {
        console.log('Error while fetching all reviews: ', error) ; 
        return res.status(500).json({
            success: false , 
            message : 'Internal server error' 
        }) ; 
    }
}

const getMyReview = async(req , res) => {
    try {
        const userId = req.user._id ;  // find the user using the middleware 

        // find the all reviews of the user
        const myReviews = await RatingAndReview.find({userId}).populate('userId' , 'fullName') ;  

        // no reviews of user
        if(myReviews.length === 0 ) {
            return res.status(404).json({
                success : false , 
                message: 'No Review found. please go and review your first movie.'
            })
        }

        // all reviews found 
        return res.status(200).json({
            success: true , 
            message: 'User all reviews are fetched' , 
            myReviews
        }) ;
    } catch (error) {
        console.log('Error while fetching the reviews: ' , error) ; 

        return res.status(500).json({
            success : false , 
            message: 'Internal server error' 
        }) ; 
    }
}

const updateReview = async (req , res ) => {
    try {
        const userId = req.user._id ; 
        const reviewId = req.params.reviewId ; 

        // check the review existing or not 
        const review = await RatingAndReview.findById(reviewId) ; 

        if(!review) {
            return res.status(404).json({
                success: false , 
                message : 'Review not found' 
            }) ;
        }

        // check the user is auth or not 
        if(review.userId.toString() !== userId.toString() ) {
            return res.status(403).json({
                success: false , 
                message: 'user not authorized'
            }) ;
        }

        //  update the review 
        const { newReview , newRating } = req.body ; 

        if (!newReview || newRating === undefined) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate rating
        if (newRating < 1 || newRating > 10) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 10'
            });
        }


        const updatedReview = await RatingAndReview.findByIdAndUpdate( reviewId , {
            review : newReview , 
            rating : newRating 
        } , { new : true }) ;

        return res.status(200).json({
            success: true , 
            message: 'Review is updated successfully',
            review : newReview , 
            rating : newRating , 
            updatedReview
        }) ; 

    } catch (error) {
        console.log('Error while updating the review: ' , error) ; 

        return res.status(500).json({
            success : false , 
            message: 'Internal server error' 
        }) ; 
    }
}

const deleteReview = async(req , res) =>{
    try {
        const userId = req.user._id ; 
        const reviewId = req.params.reviewId ; 

        const review = await RatingAndReview.findById(reviewId) ; 

        if(!review ) {
            return res.status(404).json({
                success: false , 
                message : 'Review not found' 
            }) ;
        }

        // check the user is auth or not 
        if(review.userId.toString() !== userId.toString() ) {
            return res.status(403).json({
                success: false , 
                message: 'user not authorized'
            }) ;
        } 

        // delete the review 
        const deletedReview = await RatingAndReview.findByIdAndDelete(reviewId) ; 

        return res.status(200).json({
            success: true , 
            message : 'Review deleted successfully' , 
            deletedReview
        })



    } catch (error) {
        console.log('Error while deleting the review: ' , error) ; 

        return res.status(500).json({
            success : false , 
            message: 'Internal server error' 
        }) ; 
    }
}


export {
    createReview , 
    getAllReviews , 
    getMyReview , 
    updateReview , 
    deleteReview
}