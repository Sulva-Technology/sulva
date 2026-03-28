-- ==========================================
-- SULVA DATABASE SCHEMA & SEED DATA
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 0. Create Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin users can read their own membership" ON public.admin_users;
CREATE POLICY "Admin users can read their own membership" ON public.admin_users
    FOR SELECT USING (auth.uid() = user_id);

-- 1. Create Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    "projectType" TEXT,
    budget TEXT,
    message TEXT NOT NULL
);

-- Enable Row Level Security (RLS) for contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so contact form works for anyone)
DROP POLICY IF EXISTS "Enable insert for public" ON public.contacts;
CREATE POLICY "Enable insert for public" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- Allow registered admins to view/edit/delete
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.contacts;
DROP POLICY IF EXISTS "Enable full access for admin users" ON public.contacts;
CREATE POLICY "Enable full access for admin users" ON public.contacts
    FOR ALL USING (
        EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
        )
    );


-- 2. Create Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security (RLS) for subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
DROP POLICY IF EXISTS "Enable insert for public" ON public.subscribers;
CREATE POLICY "Enable insert for public" ON public.subscribers
    FOR INSERT WITH CHECK (true);

-- Allow registered admins to view/edit/delete
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.subscribers;
DROP POLICY IF EXISTS "Enable full access for admin users" ON public.subscribers;
CREATE POLICY "Enable full access for admin users" ON public.subscribers
    FOR ALL USING (
        EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
        )
    );


-- ==========================================
-- SEED DATA (Optional: Run this to add demo data to your dashboard)
-- ==========================================

-- Seed Contacts
INSERT INTO public.contacts (name, email, company, "projectType", budget, message)
VALUES
    ('Alice Smith', 'alice@example.com', 'TechCorp', 'Web Development', '$10k-$25k', 'We need a new corporate website with a CMS.'),
    ('Bob Jones', 'bob@startup.io', 'Startup.io', 'Mobile App', '$25k+', 'Looking to build a cross-platform mobile application.'),
    ('Charlie Brown', 'charlie@designstudios.com', 'Design Studios', 'UI/UX Design', '$5k-$10k', 'We need help redesigning our administrative dashboard.')
ON CONFLICT DO NOTHING;

-- Seed Subscribers
INSERT INTO public.subscribers (email)
VALUES
    ('alice@example.com'),
    ('newsletter.fan@gmail.com'),
    ('bob@startup.io'),
    ('marketing@techcorp.com')
ON CONFLICT (email) DO NOTHING;
