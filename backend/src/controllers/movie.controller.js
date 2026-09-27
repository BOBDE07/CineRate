/*
searchMovies
    ↓
Check MongoDB for matching movie
    ↓
If found → return from MongoDB
    ↓
If not found → call OMDB API
    ↓
Save movie in MongoDB
    ↓
Return movie
*/

import { Movie } from "../models/movie.model.js";

const searchMovie = async (req, res, next) => {
    const movieTitle = req.query.title;

    if (!movieTitle) {
        return res.status(400).json({
            success: false,
            message: "Please provide movie name"
        });
    }

    try {
        // check the movie is present in database 
        const existingMovie = await Movie.findOne({
            title: { $regex: new RegExp(`^${movieTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
        })

        if (existingMovie) {
            return res.status(200).json({
                success: true,
                message: 'Movie found successfully',
                data: existingMovie
            });
        }

        // if movie is not present in database then we call omdb api key (t is for searching)
        const omdbUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${process.env.OMDB_API_KEY}`;

        const response = await fetch(omdbUrl);
        const movieData = await response.json();
        console.log("OMDB Response:", movieData);

        if (movieData.Response === "False") {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        // Transform OMDB data to match the Movie schema before saving
        const parsedDuration = parseInt(movieData.Runtime); // "169 min" → 169, "N/A" → NaN
        const movie = await Movie.create({
            title: movieData.Title,
            omdbId: movieData.imdbID,
            description: movieData.Plot,
            poster: movieData.Poster,
            releaseDate: movieData.Released,
            genre: movieData.Genre
                ? movieData.Genre.split(',').map(g => g.trim())  // "Adventure, Drama" → ["Adventure", "Drama"]
                : [],
            duration: isNaN(parsedDuration) ? null : parsedDuration  // guard against "N/A"
        })

        return res.status(200).json({
            success: true,
            message: 'Movie is added successfully in database',
            data: movie
        });
    } catch (error) {
        console.log('Error in search movie api: ', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching movie'
        })
    }
}


/*
Check MongoDB
        ↓
Movie exists?
   ↙          ↘
 YES           NO
  ↓             ↓
Return DB    Call OMDb API
                ↓
           Save movie
                ↓
           Return movie
*/
const getMovieDetail = async (req , res) => {
    const {omdbId} = req.params ; 

    if(!omdbId) {
        return res.status(400).json({
            success: false , 
            message: 'Please provide movie id'
        }) ; 
    }

    try {
        // check movie is present in database
        const existingMovie = await Movie.findOne({
            omdbId: omdbId 
        }) ; 

        if(existingMovie) {
            return res.status(200).json({
                success: true , 
                message: 'Movie found in DB', 
                data : existingMovie 
            }) ; 
        } 
        
        // Movie Not found in DataBase , Call OMDB api (i is for imdbId)
        const omdbUrl = `https://www.omdbapi.com/?i=${encodeURIComponent(omdbId)}&apikey=${process.env.OMDB_API_KEY}` ; 
        const response = await fetch(omdbUrl) ;
        const movieData = await response.json() ; 

        if(movieData.Response === 'False') {
            return res.status(404).json({
                success: false , 
                message : 'Movie not found'
            }) ; 
        }

        //  Transform OMDB data to match the Movie schema before saving
        const parsedDuration = parseInt(movieData.Runtime); // "169 min" → 169, "N/A" → NaN
        const movie = await Movie.create({
            title: movieData.Title,
            omdbId: movieData.imdbID,
            description: movieData.Plot,
            poster: movieData.Poster,
            releaseDate: movieData.Released,
            genre: movieData.Genre
                ? movieData.Genre.split(',').map(g => g.trim())  // "Adventure, Drama" → ["Adventure", "Drama"]
                : [],
            duration: isNaN(parsedDuration) ? null : parsedDuration  // guard against "N/A"
        })

        return res.status(200).json({
            success: true , 
            message: 'Movie is added successfully in database' , 
            data : movie 
        })
        
    } catch (error) {
        console.log('Error in get movie details api: ', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching movie details'
        })
    }
}

export {
    searchMovie , 
    getMovieDetail
}