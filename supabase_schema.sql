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


-- 3. Create Insights Table
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    featured BOOLEAN DEFAULT false NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable public read for published insights" ON public.insights;
CREATE POLICY "Enable public read for published insights" ON public.insights
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Enable full access for authenticated users" ON public.insights;
DROP POLICY IF EXISTS "Enable full access for admin users" ON public.insights;
CREATE POLICY "Enable full access for admin users" ON public.insights
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

-- Seed Insights
INSERT INTO public.insights (slug, title, category, excerpt, content, author, image_url, featured, is_published, published_at)
VALUES
    (
        'ai-agents-are-redesigning-modern-software-teams',
        'AI Agents Are Redesigning Modern Software Teams',
        'AI',
        'Why product, engineering, and operations teams are restructuring around autonomous workflows instead of isolated tools.',
        'AI agents are moving from novelty to operating model. The biggest change is not that teams can automate a task or two, but that they can stitch research, planning, execution, and reporting into repeatable systems. Companies that treat agents as teammates rather than widgets are seeing faster experimentation cycles, tighter feedback loops, and cleaner handoffs across functions.' || E'\n\n' ||
        'This changes how software teams are organized. Product managers can run discovery faster, engineers can automate maintenance and repetitive fixes, and operators can reduce time spent on routing and reconciliation. The immediate opportunity is not replacing people. It is helping strong teams spend more time on judgment and less time on busywork.' || E'\n\n' ||
        'The teams getting the most value are building with guardrails. They define ownership, review checkpoints, and clear limits for what an agent can do without approval. That combination of autonomy and control is quickly becoming a core capability for modern digital organizations.',
        'Sulva Tech Editorial',
        'https://picsum.photos/id/20/1200/800',
        true,
        true,
        '2026-03-03T09:00:00Z'
    ),
    (
        'the-new-stack-for-building-reliable-ai-products',
        'The New Stack for Building Reliable AI Products',
        'ENGINEERING',
        'A practical look at the infrastructure patterns that separate toy demos from dependable AI-powered products.',
        'Shipping AI features is easier than ever, but operating them reliably is still hard. Teams need to think beyond model access and focus on evaluation, observability, retry behavior, prompt versioning, and human fallback paths. Without that foundation, a launch can feel polished while still failing under real-world traffic and unpredictable inputs.' || E'\n\n' ||
        'A dependable AI stack usually includes a retrieval layer, a strong application boundary, event logging, and clear failure handling. It also includes measurement. If a team cannot compare prompts, trace outputs, and review edge cases, it cannot improve the product with confidence.' || E'\n\n' ||
        'Reliability becomes a product advantage when teams invest in operational clarity early. The winners will not be the teams with the flashiest demos. They will be the ones that make AI features understandable, measurable, and trustworthy at scale.',
        'Sarah Jenkins',
        'https://picsum.photos/id/21/1200/800',
        false,
        true,
        '2026-02-19T09:00:00Z'
    ),
    (
        'why-design-systems-matter-more-in-the-age-of-ai',
        'Why Design Systems Matter More in the Age of AI',
        'DESIGN',
        'As AI speeds up product output, design systems are becoming the main defense against inconsistency and drift.',
        'AI can accelerate the production of UI ideas, flows, and content, but it can just as easily magnify inconsistency. That makes design systems more important, not less. A strong design system provides the language, constraints, and reusable patterns that keep rapidly built experiences coherent across touchpoints.' || E'\n\n' ||
        'This is especially important for growing teams. When multiple contributors are shipping quickly, shared standards reduce review friction and help teams preserve quality under pressure. The design system becomes a strategic asset because it protects trust. Customers notice when interfaces feel aligned, predictable, and intentional.' || E'\n\n' ||
        'The best systems are not static libraries. They are living operating tools that align designers, engineers, marketers, and product teams around one product voice.',
        'Michael Chen',
        'https://picsum.photos/id/22/1200/800',
        false,
        true,
        '2026-01-28T09:00:00Z'
    ),
    (
        'cyber-resilience-is-now-a-product-strategy',
        'Cyber Resilience Is Now a Product Strategy',
        'SECURITY',
        'Security is no longer just a compliance line item. It is shaping product architecture, trust, and revenue outcomes.',
        'Teams used to treat security as a final-stage review. That approach no longer holds up against modern threat surfaces, distributed architectures, and rising customer expectations. Resilience now has to be built into product strategy from the start, especially in sectors handling payments, health data, or critical workflows.' || E'\n\n' ||
        'This shift changes priorities. Identity boundaries, audit trails, incident readiness, data minimization, and access controls become product decisions. They influence onboarding, collaboration, analytics, and support. When designed well, security feels like confidence rather than friction.' || E'\n\n' ||
        'Organizations that invest early are seeing more than reduced risk. They are earning trust faster, passing procurement checks more smoothly, and creating a stronger foundation for scaling partnerships.',
        'Amara Diop',
        'https://picsum.photos/id/23/1200/800',
        false,
        true,
        '2025-12-11T09:00:00Z'
    )
ON CONFLICT (slug) DO NOTHING;
