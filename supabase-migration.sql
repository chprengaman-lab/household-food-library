-- Household Library — Supabase schema migration
-- Run this in the Supabase SQL editor: Dashboard → SQL Editor → New query

-- ── Shared trigger function for updated_at ────────────────────────────────────

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── recipes ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS recipes (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id    TEXT        NOT NULL DEFAULT 'prengaman',
  created_by      TEXT        NOT NULL DEFAULT '',
  updated_by      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT        NOT NULL,
  photo           TEXT,
  ingredients     TEXT[]      NOT NULL DEFAULT '{}',
  instructions    TEXT[]      NOT NULL DEFAULT '{}',
  notes           TEXT,
  next_time_notes TEXT,
  calories        INTEGER,
  protein         INTEGER,
  difficulty      TEXT        CHECK (difficulty IN ('easy', 'medium', 'hard')),
  portion         TEXT        CHECK (portion IN ('light', 'normal', 'filling')),
  cuisine         TEXT,
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  chase_rating    NUMERIC(3,1),
  chloe_rating    NUMERIC(3,1),
  times_made      INTEGER     NOT NULL DEFAULT 0,
  last_made       TIMESTAMPTZ,
  would_make_again BOOLEAN    NOT NULL DEFAULT FALSE,
  needs_review    BOOLEAN,
  ai_generated_fields TEXT[],
  ai_meta         JSONB
);

CREATE TRIGGER set_updated_at_recipes
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "household members can select recipes" ON recipes
  FOR SELECT USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can insert recipes" ON recipes
  FOR INSERT WITH CHECK (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can update recipes" ON recipes
  FOR UPDATE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can delete recipes" ON recipes
  FOR DELETE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

-- ── drinks ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS drinks (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id    TEXT        NOT NULL DEFAULT 'prengaman',
  created_by      TEXT        NOT NULL DEFAULT '',
  updated_by      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT        NOT NULL,
  photo           TEXT,
  drink_kind      TEXT        NOT NULL CHECK (drink_kind IN ('espresso', 'coffee', 'cocktail', 'mocktail', 'beer', 'wine')),
  taste_notes     TEXT,
  ingredients     TEXT[],
  instructions    TEXT[],
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  chase_rating    NUMERIC(3,1),
  chloe_rating    NUMERIC(3,1),
  espresso        JSONB,
  needs_review    BOOLEAN,
  ai_generated_fields TEXT[],
  ai_meta         JSONB
);

CREATE TRIGGER set_updated_at_drinks
  BEFORE UPDATE ON drinks
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "household members can select drinks" ON drinks
  FOR SELECT USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can insert drinks" ON drinks
  FOR INSERT WITH CHECK (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can update drinks" ON drinks
  FOR UPDATE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can delete drinks" ON drinks
  FOR DELETE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

-- ── restaurants ───────────────────────────────────────────────────────────────
-- dishes and drinks are stored as JSONB arrays in the restaurant row itself.
-- No separate join tables are needed; they are always accessed together.

CREATE TABLE IF NOT EXISTS restaurants (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id    TEXT        NOT NULL DEFAULT 'prengaman',
  created_by      TEXT        NOT NULL DEFAULT '',
  updated_by      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT        NOT NULL,
  photo           TEXT,
  city            TEXT,
  state           TEXT,
  country         TEXT,
  visit_date      TIMESTAMPTZ,
  notes           TEXT,
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  chase_rating    NUMERIC(3,1),
  chloe_rating    NUMERIC(3,1),
  would_return    BOOLEAN     NOT NULL DEFAULT FALSE,
  dishes          JSONB       NOT NULL DEFAULT '[]',
  drinks          JSONB       NOT NULL DEFAULT '[]'
);

CREATE TRIGGER set_updated_at_restaurants
  BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "household members can select restaurants" ON restaurants
  FOR SELECT USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can insert restaurants" ON restaurants
  FOR INSERT WITH CHECK (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can update restaurants" ON restaurants
  FOR UPDATE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can delete restaurants" ON restaurants
  FOR DELETE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );

-- ── pantry_items ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS pantry_items (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id    TEXT        NOT NULL DEFAULT 'prengaman',
  created_by      TEXT        NOT NULL DEFAULT '',
  updated_by      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT        NOT NULL,
  photo           TEXT,
  brand           TEXT,
  stores          TEXT[]      NOT NULL DEFAULT '{}',
  category        TEXT        NOT NULL DEFAULT 'Other',
  notes           TEXT,
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  chase_rating    NUMERIC(3,1),
  chloe_rating    NUMERIC(3,1),
  would_buy_again BOOLEAN     NOT NULL DEFAULT FALSE,
  ai_generated_fields TEXT[],
  ai_meta         JSONB
);

CREATE TRIGGER set_updated_at_pantry_items
  BEFORE UPDATE ON pantry_items
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "household members can select pantry_items" ON pantry_items
  FOR SELECT USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can insert pantry_items" ON pantry_items
  FOR INSERT WITH CHECK (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can update pantry_items" ON pantry_items
  FOR UPDATE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
CREATE POLICY "household members can delete pantry_items" ON pantry_items
  FOR DELETE USING (
    household_id = 'prengaman'
    AND auth.email() IN ('chprengaman@gmail.com', 'chloeprengaman@gmail.com')
  );
