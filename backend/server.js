import 'dotenv/config'
import express from "express" ; 
import connectDB from './src/db/db.js';
import userRouter from './src/routes/user.route.js';
import cookieParser from "cookie-parser";
import movieRouter from './src/routes/movie.route.js';
import reviewRouter from './src/routes/RatingAndReview.route.js';
import cors from 'cors';

connectDB() ;

const app = express() ; 

const PORT = process.env.PORT || 5000 ; 

const ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL,           // whatever is set in .env (highest priority)
    'https://cinerate-rate-rouge.vercel.app',
    'http://localhost:5173',            // Vite default port
    'http://localhost:5174',            // Vite fallback port
].filter(Boolean) ; // remove undefined if FRONTEND_URL is not set

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, mobile apps)
        if (!origin) return callback(null, true) ;
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true) ;
        callback(new Error(`CORS: Origin ${origin} not allowed`)) ;
    },
    credentials: true
})) ;

app.use(express.json() ) ; 
app.use(cookieParser()) ;

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/movie' , movieRouter)
app.use('/api/v1/review' , reviewRouter)

app.listen( PORT , () => {
    console.log(`Server is running on port: ${PORT}`) ; 
})
