/*
  # Create user profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `user_type` (text, either 'recruiter' or 'candidate')
      - `full_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `department` (text, optional)
      - `role` (text, optional)
      - `location` (text, optional)
      - `skills` (text array, optional)
      - `certifications` (text array, optional)
      - `resume_url` (text, optional)
      - `linkedin_profile` (text, optional)
      - `portfolio_url` (text, optional)
      - `bio` (text, optional)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for users to read and update their own profile
    - Add policy for recruiters to read candidate profiles
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('recruiter', 'candidate')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  department text,
  role text,
  location text,
  skills text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  resume_url text,
  linkedin_profile text,
  portfolio_url text,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to manage their own profile
CREATE POLICY "Users can manage own profile"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy for recruiters to read candidate profiles
CREATE POLICY "Recruiters can read candidate profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles recruiter_profile
      WHERE recruiter_profile.id = auth.uid()
      AND recruiter_profile.user_type = 'recruiter'
    )
    AND user_type = 'candidate'
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();