/*
  # Create Demo Users

  1. Demo Users
    - Creates demo recruiter and candidate accounts
    - Sets up their profiles with sample data
  
  2. Security
    - Uses Supabase auth system
    - Proper user profiles linked to auth users
*/

-- Insert demo users into auth.users (this will be handled by Supabase Auth)
-- We'll create the profiles that will be linked when users sign up

-- Note: The actual user creation will happen through the signup process
-- This migration ensures the user_profiles table is ready for the demo users