-- ============================================================
-- Phase 13: Drink Nutrition columns
-- Run this in the Supabase SQL Editor (one time).
-- ============================================================

ALTER TABLE drinks
  ADD COLUMN IF NOT EXISTS calories INTEGER,
  ADD COLUMN IF NOT EXISTS protein NUMERIC(6, 1),
  ADD COLUMN IF NOT EXISTS caffeine_mg NUMERIC(6, 1),
  ADD COLUMN IF NOT EXISTS serving_size TEXT,
  ADD COLUMN IF NOT EXISTS abv_percent NUMERIC(5, 2),
  ADD COLUMN IF NOT EXISTS calorie_source TEXT CHECK (calorie_source IN ('user', 'ai_estimate')),
  ADD COLUMN IF NOT EXISTS protein_source TEXT CHECK (protein_source IN ('user', 'ai_estimate')),
  ADD COLUMN IF NOT EXISTS caffeine_source TEXT CHECK (caffeine_source IN ('user', 'ai_estimate'));
