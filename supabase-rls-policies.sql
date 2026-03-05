-- =============================================================================
-- Grace's Florette — Supabase RLS Policies
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================================================
-- These policies enforce row-level security so that even if the application
-- is compromised, the database enforces its own access rules.
-- =============================================================================

-- ─── Enable RLS on all tables ─────────────────────────────────────────────────

ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories        ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;

-- ─── Drop existing policies before recreating (idempotent) ───────────────────

DROP POLICY IF EXISTS "Public read available products"      ON products;
DROP POLICY IF EXISTS "Admin full access to products"       ON products;
DROP POLICY IF EXISTS "Public read categories"              ON categories;
DROP POLICY IF EXISTS "Admin full access to categories"     ON categories;
DROP POLICY IF EXISTS "Admin read own record"               ON admin_users;
DROP POLICY IF EXISTS "Public read enabled sections"        ON homepage_sections;
DROP POLICY IF EXISTS "Admin full access to sections"       ON homepage_sections;

-- =============================================================================
-- PRODUCTS
-- =============================================================================

-- Anyone can read available (published) products
CREATE POLICY "Public read available products"
  ON products FOR SELECT
  USING (is_available = true);

-- Admins (users in admin_users table) can do anything
CREATE POLICY "Admin full access to products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- =============================================================================
-- CATEGORIES
-- =============================================================================

-- Anyone can read categories (needed for the public shop filter/nav)
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (true);

-- Admins can do anything
CREATE POLICY "Admin full access to categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- =============================================================================
-- ADMIN_USERS
-- =============================================================================

-- Admins can only read their own row (no one can insert/update/delete via client)
CREATE POLICY "Admin read own record"
  ON admin_users FOR SELECT
  USING (auth.uid() = id);

-- No INSERT/UPDATE/DELETE policy — admin rows must be managed directly in
-- the Supabase dashboard or via a trusted migration script.

-- =============================================================================
-- HOMEPAGE_SECTIONS
-- =============================================================================

-- Anyone can read enabled sections (needed for the public homepage)
CREATE POLICY "Public read enabled sections"
  ON homepage_sections FOR SELECT
  USING (is_enabled = true);

-- Admins can do anything (read all, enable/disable, edit titles)
CREATE POLICY "Admin full access to sections"
  ON homepage_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- =============================================================================
-- STORAGE — product-images bucket
-- Run separately in Dashboard → Storage → Policies if not already set
-- =============================================================================

DROP POLICY IF EXISTS "Public read product images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete product images" ON storage.objects;

-- Anyone can view images
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT TO PUBLIC
  USING (bucket_id = 'product-images');

-- Only authenticated admins can upload
CREATE POLICY "Admin upload product images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- Only authenticated admins can delete
CREATE POLICY "Admin delete product images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid())
  );

-- =============================================================================
-- VERIFICATION — run after applying to confirm RLS is active
-- =============================================================================
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';
--
-- SELECT schemaname, tablename, policyname, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
