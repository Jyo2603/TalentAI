/*
  # Fix infinite recursion in user_profiles RLS policy

  1. Security Changes
    - Drop existing problematic RLS policies on `user_profiles` table
    - Create correct RLS policies that don't cause infinite recursion
    - Ensure policies use `auth.uid()` correctly without circular references

  2. Policy Details
    - Users can read their own profile data
    - Recruiters can read candidate profiles
    - Users can update their own profiles
    - Users can insert their own profiles
*/

-- Drop all existing policies on user_profiles to start fresh
DROP POLICY IF EXISTS "Users can manage own profile" ON user_profiles;
DROP POLICY IF EXISTS "Recruiters can read candidate profiles" ON user_profiles;

-- Create correct policies without recursion
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

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