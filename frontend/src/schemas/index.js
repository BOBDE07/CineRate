import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const reviewSchema = z.object({
  rating: z
    .number({ invalid_type_error: 'Rating is required' })
    .min(1, 'Rating must be at least 1')
    .max(10, 'Rating must be at most 10'),
  review: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be under 1000 characters'),
});

export const updateReviewSchema = z.object({
  newRating: z
    .number({ invalid_type_error: 'Rating is required' })
    .min(1, 'Rating must be at least 1')
    .max(10, 'Rating must be at most 10'),
  newReview: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be under 1000 characters'),
});
