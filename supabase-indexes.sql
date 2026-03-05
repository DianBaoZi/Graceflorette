-- =============================================================================
-- Grace's Florette — Performance Indexes
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- =============================================================================

-- Partial index for shop page and homepage: WHERE is_available = true
-- Covers: .eq("is_available", true).order("created_at", { ascending: false })
CREATE INDEX IF NOT EXISTS idx_products_available_created
  ON products (is_available, created_at DESC)
  WHERE is_available = true;

-- GIN index for homepage tag-based section queries
-- Covers: .contains("tags", ["featured"]) etc.
CREATE INDEX IF NOT EXISTS idx_products_tags_gin
  ON products USING GIN (tags);
