import express from 'express' ; 
import userAuth from '../middlewares/user.middleware.js';
import { getMovieDetail, searchMovie } from '../controllers/movie.controller.js';

const movieRouter = express.Router() ; 

movieRouter.get('/search', userAuth , searchMovie) ; 
movieRouter.get('/movieDetail/:omdbId' , userAuth , getMovieDetail)

export default movieRouter ; 