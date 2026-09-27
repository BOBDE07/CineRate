import mongoose from 'mongoose' ; 

const movieSchema = new mongoose.Schema({
    omdbId : {
        type: String , 
        required: true ,
        unique: true ,
    } , 
    title: {
        type: String , 
        required: true , 
        trim : true 
    }, 
    description :{
        type: String , 
        required: true 
    }, 
    poster : {
        type: String , 
        default: null 
    }, 
    releaseDate: {
        type: Date , 
        required: true ,
    }, 
    genre: {
        type: [String],   // array of strings — OMDB returns "Adventure, Drama, Sci-Fi"
    } ,
    duration: {
        type: Number ,
    }, 
    // rating and review is coming from rating review model (we build this later)
} , {timestamps : true }) 

export const Movie = mongoose.model("Movie" , movieSchema)