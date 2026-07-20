-- ============================================================
-- Phase 12: Restaurant Visits table
-- Run this in the Supabase SQL Editor (one time).
-- ============================================================

CREATE TABLE IF NOT EXISTS restaurant_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id TEXT NOT NULL,
  restaurant_id TEXT NOT NULL,
  created_by TEXT,
  updated_by TEXT,
  visit_date TIMESTAMPTZ,
  bill_total NUMERIC(10, 2),
  notes TEXT,
  dish_ids JSONB NOT NULL DEFAULT '[]',
  drink_ids JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_restaurant_visits_household ON restaurant_visits(household_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_visits_restaurant ON restaurant_visits(restaurant_id);

ALTER TABLE restaurant_visits ENABLE ROW LEVEL SECURITY;

-- Reuse the updated_at trigger
CREATE TRIGGER set_updated_at_restaurant_visits
  BEFORE UPDATE ON restaurant_visits
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE POLICY "household members can select restaurant_visits" ON restaurant_visits
  FOR SELECT USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

CREATE POLICY "household members can insert restaurant_visits" ON restaurant_visits
  FOR INSERT WITH CHECK (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

CREATE POLICY "household members can update restaurant_visits" ON restaurant_visits
  FOR UPDATE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

CREATE POLICY "household members can delete restaurant_visits" ON restaurant_visits
  FOR DELETE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
