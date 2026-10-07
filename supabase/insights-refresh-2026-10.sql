-- Insights refresh, October 2026.
-- Replaces the generic launch posts with posts about Sulva's real work.
-- Run once in the Supabase SQL editor (Project -> SQL Editor -> New query -> paste -> Run).
-- Safe to re-run. Retired posts are moved to draft, not deleted: restore one from /admin/insights if needed.

BEGIN;

-- 1. Retire the generic and placeholder posts.
UPDATE public.insights
SET status = 'draft', is_published = false, featured = false, updated_at = timezone('utc'::text, now())
WHERE slug IN (
    'ai-agents-are-redesigning-modern-software-teams',
    'the-new-stack-for-building-reliable-ai-products',
    'why-design-systems-matter-more-in-the-age-of-ai',
    'cyber-resilience-is-now-a-product-strategy',
    'bata-luxury-ecommerce-store',
    'iyiola-personal-portfolio-website'
);

-- 2. Add the new posts and rewrite the two existing real-work posts (same slugs, so their URLs keep working).
INSERT INTO public.insights (slug, title, category, excerpt, content, author, author_role, image_url, og_image_url, website_url, seo_title, seo_description, canonical_url, status, featured, is_published, published_at)
VALUES
    (
        $txt$why-every-site-comes-with-a-dashboard$txt$,
        $txt$Why every site we build comes with its own dashboard$txt$,
        $txt$How we work$txt$,
        $txt$A website you can't update yourself goes stale. Here's why every client gets a dashboard, and what goes in it.$txt$,
        $txt$Most small-business websites go stale for the same reason: changing anything means emailing the developer. A new price, a new photo, a sold property, a post about last week's event. Each one waits in someone else's inbox, most never happen, and the site slowly stops matching the business.

So every site we build comes with its own dashboard. Not a generic admin panel bolted on at the end, but a small control room designed around the jobs that business actually does every week.

What goes inside depends on the business. For Mindfire Homes it's properties, leads, blog posts and the newsletter list. For Itzlolabeauty it's bookings, products, orders, customers and the gallery. For The Inner Circle it's community pages and media uploads. For Meal Direct, the dashboard grew into a full control centre that runs vendors, riders and orders.

The test we use is simple: could the owner make this week's changes without calling us? If the answer is no, the dashboard isn't finished. That means plain labels, forms that match the way the business talks, and nothing on screen the owner will never use.

Enquiries matter as much as content. When someone fills in a form on the site, it lands in the dashboard as a lead, so nothing gets lost in an email thread and you can see at a glance who is still waiting on a reply.

We still look after sites after launch, and clients still call us for bigger changes. But the everyday work is theirs. A website should be a tool you use, not a brochure you're stuck with.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/work/innercircle/poster.jpg$txt$,
        $txt$/work/innercircle/poster.jpg$txt$,
        NULL,
        $txt$Why every site we build comes with its own dashboard$txt$,
        $txt$A website you can't update yourself goes stale. Here's why every client gets a dashboard, and what goes in it.$txt$,
        $txt$https://sulvatech.com/insights/why-every-site-comes-with-a-dashboard$txt$,
        $txt$published$txt$,
        true,
        true,
        '2026-10-07T09:00:00Z'
    ),
    (
        $txt$meal-direct-five-apps-behind-a-scheduled-lunch$txt$,
        $txt$Meal Direct: the five apps behind one scheduled lunch$txt$,
        $txt$Case study$txt$,
        $txt$Campus food on a schedule needed more than a website. A look at the student app, vendor portal, rider app, control centre and API we built for Meal Direct.$txt$,
        $txt$Meal Direct started with a problem every student knows. Lectures end, the queue at the food stand is already long, the vendor runs out of the good stuff, and on-demand delivery costs too much to use every day.

The idea is to flip it around. Students order ahead from verified campus vendors and get their food at a fixed time. Vendors see orders in advance and cook in batches. Riders deliver on a schedule instead of making one rushed trip per order. Planning ahead is what makes it cheaper and calmer for everyone.

That only works if every side of the operation runs on the same system, so we built five connected parts. A student app for browsing vendors and ordering ahead. A vendor portal for incoming orders and what to prepare. A rider app for delivery runs. A control centre where the Meal Direct team manages vendors, riders and orders. And an API that keeps all four in step.

The hardest design work wasn't visual. It was deciding where an order lives at each stage and who is allowed to change it. A student shouldn't be able to edit an order a vendor has already started cooking. A rider needs to see exactly what to collect and where. The team needs to step in when something goes wrong without phoning three people.

The public website at mealdirectly.com has its own job: explain a new way of buying lunch fast enough that a student wants to try it. So the homepage leads with the problem, shows how it works in a few steps, and gives people something to play with, a 3D model you can drag to spin.

If you're building something with more than one kind of user, like customers, partners and staff, this is the shape of project we enjoy most. Start with the operation, then design the screens around it.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/work/mealdirect/poster.jpg$txt$,
        $txt$/work/mealdirect/poster.jpg$txt$,
        $txt$https://www.mealdirectly.com$txt$,
        $txt$Meal Direct: the five apps behind one scheduled lunch$txt$,
        $txt$Campus food on a schedule needed more than a website. A look at the student app, vendor portal, rider app, control centre and API we built for Meal Direct.$txt$,
        $txt$https://sulvatech.com/insights/meal-direct-five-apps-behind-a-scheduled-lunch$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-10-07T08:00:00Z'
    ),
    (
        $txt$mindfire-homes-real-estate-platform$txt$,
        $txt$Mindfire Homes: selling property online starts with trust$txt$,
        $txt$Case study$txt$,
        $txt$Buyers in Abuja worry about title before they worry about tiles. How we built Mindfire Homes around verification, clear listings and easy enquiries.$txt$,
        $txt$When someone looks at property in Abuja, the first question usually isn't about finishes or floor plans. It's whether the title is real. Mindfire Homes sells verified homes and investment property and checks the title first, so the website had to make that promise obvious before anything else.

Trust leads the page. Before a single listing appears, the homepage says what Mindfire actually does: legally verified residences, documented titles, inspected construction, and payment terms agreed in writing before you commit. Everything after that is easier to believe.

Listings and detail pages come next, laid out so a buyer can compare quickly: where it is, what it is, the key details and the photos. Every page keeps one next step in view, explore properties or book a private viewing, and every enquiry lands in the dashboard as a lead.

The blog is there for the slower buyer: people researching for months, or buying from abroad. Posts answer the questions the team hears every week, and a newsletter signup keeps those readers close until they're ready to talk.

Behind it, the Mindfire team runs everything themselves: adding and updating properties, following up leads, publishing posts and growing the newsletter list. Nobody waits on us to mark a house as sold.

The lesson carries over to any high-trust purchase. Before you sell the product, answer the fear. Then make the next step small.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/work/mindfirehomes/poster.jpg$txt$,
        $txt$/work/mindfirehomes/poster.jpg$txt$,
        $txt$https://www.mindfirehomes.com$txt$,
        $txt$Mindfire Homes: selling property online starts with trust$txt$,
        $txt$Buyers in Abuja worry about title before they worry about tiles. How we built Mindfire Homes around verification, clear listings and easy enquiries.$txt$,
        $txt$https://sulvatech.com/insights/mindfire-homes-real-estate-platform$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-03-30T09:00:00Z'
    ),
    (
        $txt$itzlolabeauty-bookings-and-a-shop-on-one-site$txt$,
        $txt$Itzlolabeauty: bookings and a shop on one site$txt$,
        $txt$Case study$txt$,
        $txt$A makeup artist needs two things from a website: a calendar that fills itself and a shop that sells between appointments. How we put both in one place.$txt$,
        $txt$Itzlolabeauty is a luxury makeup artist based in Arizona who also sells beauty products. That's two businesses with different rhythms: appointments are booked ahead around a fixed calendar, while products sell at any hour. The website had to serve both without either feeling like an add-on.

Booking comes first, because that's what most visitors arrive wanting to do. Clients pick a service and see live availability, so they only choose times that are actually free. No back-and-forth in the DMs to find a slot, and no double bookings.

The shop sits alongside it with its own checkout. Someone who has just booked a session can pick up products in the same visit, and a past client can reorder without needing an appointment at all.

The look matters more than usual here, because the work itself is visual. The site is built around large photography and a gallery, with the interface kept quiet so the makeup does the talking.

Day to day, everything runs from one dashboard: bookings, products, orders, customers and the gallery. New work goes up without a developer, and the owner sees the whole business in one place, not half of it in a calendar app and half in a spreadsheet.

If you sell a service and products, resist building two websites. One site, one customer list and one dashboard is easier for your clients and far easier for you.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/work/itzlolabeauty/poster.jpg$txt$,
        $txt$/work/itzlolabeauty/poster.jpg$txt$,
        $txt$https://www.itzlolabeauty.com$txt$,
        $txt$Itzlolabeauty: bookings and a shop on one site$txt$,
        $txt$A makeup artist needs two things from a website: a calendar that fills itself and a shop that sells between appointments. How we put both in one place.$txt$,
        $txt$https://sulvatech.com/insights/itzlolabeauty-bookings-and-a-shop-on-one-site$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-10-07T07:00:00Z'
    ),
    (
        $txt$time-to-move-your-shop-off-instagram-dms$txt$,
        $txt$Is it time to move your shop off Instagram DMs?$txt$,
        $txt$Guides$txt$,
        $txt$Selling through DMs works until it doesn't. Five signs your business has outgrown it, and what a proper online store changes.$txt$,
        $txt$A lot of good businesses start in the DMs. You post a product, people message to ask the price, you send account details, they send a screenshot, you arrange delivery. It works, and for a while it's the right call: no setup, no fees, and you get to know every customer.

Then it starts to cost you. These are the signs we see most often.

You answer the same three questions all day. Price, sizes, delivery. Every one of those messages slows down a sale. A product page answers them once, for everyone, at two in the morning.

Orders get lost. When orders live in chat threads, payment confirmations and addresses are scattered across screenshots. Eventually something slips, and it's usually your best customer who notices.

You can't see your business. Which products sell? Who buys again? In the DMs the answer lives in your memory. In a store dashboard it's a list you can sort.

New customers don't trust paying a stranger. People who don't know you yet are nervous sending money to a personal account. A proper checkout, clear policies and order emails take that worry away.

You want to grow beyond your followers. A website can be found on Google and shared as a link that works for anyone, not just people who already follow you.

A store doesn't replace Instagram. It gives Instagram somewhere to send people. Keep posting and keep the conversations; let the website handle the catalogue, payment and orders. That's what we build for stores like Itzlolabeauty and theDMAshop: a storefront, secure checkout, and a dashboard for products, orders and customers.

If two or more of those signs sound familiar, it's probably time. Tell us what you sell and how you sell it today, and we'll tell you honestly whether a store makes sense yet.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/insights/cover-guides.jpg$txt$,
        $txt$/insights/cover-guides.jpg$txt$,
        NULL,
        $txt$Is it time to move your shop off Instagram DMs?$txt$,
        $txt$Selling through DMs works until it doesn't. Five signs your business has outgrown it, and what a proper online store changes.$txt$,
        $txt$https://sulvatech.com/insights/time-to-move-your-shop-off-instagram-dms$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-10-06T09:00:00Z'
    ),
    (
        $txt$what-to-have-ready-before-you-talk-to-a-web-studio$txt$,
        $txt$What to have ready before you talk to a web studio$txt$,
        $txt$Guides$txt$,
        $txt$You don't need a formal brief, a sitemap or a budget spreadsheet. You need answers to six plain questions. Here they are.$txt$,
        $txt$People often put off contacting a studio because they think they need a formal brief first. You don't. Our first step is a 30-minute call, and the most useful thing you can bring is clear answers to a few plain questions.

What does your business do, in one sentence? If you can say it simply, the website can too. If you can't yet, that's worth working out together before any design starts.

What should the site get people to do? Book, buy, enquire, sign up, visit. Pick one main action. Every page will be built to move people toward it.

Who is it for? Not everyone. The person most likely to pay you: where they are, what they worry about, what they'd type into Google.

What do you need to update yourself? Prices, products, listings, posts, photos. This decides what goes in your dashboard, and it's the question most people forget until after launch.

What do you already have? A logo, photos, copy, an old site, social pages. None of it has to be perfect. We'll help with the words, but real photos of your work beat stock images every time.

Which websites do you like, and why? Two or three links, with a sentence on what you like about each, tell us more than a mood board.

After the call we send a written plan: the pages, the features and the price. You approve it before we start, so nothing about cost is a surprise. If you can answer most of these, you're ready to talk.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/insights/cover.jpg$txt$,
        $txt$/insights/cover.jpg$txt$,
        NULL,
        $txt$What to have ready before you talk to a web studio$txt$,
        $txt$You don't need a formal brief, a sitemap or a budget spreadsheet. You need answers to six plain questions. Here they are.$txt$,
        $txt$https://sulvatech.com/insights/what-to-have-ready-before-you-talk-to-a-web-studio$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-10-05T09:00:00Z'
    ),
    (
        $txt$vui-studify-ai-learning-platform$txt$,
        $txt$VUI Studify: turning your own notes into practice$txt$,
        $txt$Product$txt$,
        $txt$Students don't need another app to read in. They need one that tests them on their own material. What we built into VUI Studify, and why.$txt$,
        $txt$Most revision is passive. Students reread notes, highlight PDFs and hope it sticks. It feels productive, but what actually builds memory is being asked questions, getting some wrong, and fixing them while there's still time.

VUI Studify is our learning platform built around that idea. Students upload their own materials, and the platform turns them into practice: questions, flashcards and exam-style tests drawn from what they actually have to learn, not a generic question bank.

Every part of it pushes toward active recall. Difficult concepts can be simplified on request. Theory answers get feedback, so students see where an answer falls short, not just that it's wrong. Weak areas are tracked, so revision time goes where it's needed.

Consistency is the other half. XP, mastery tracking, leaderboards and short games make it easier to come back every day, which matters more than any single long study session.

It's built for the exams students actually sit, from school exams to professional tests and major national exams. One place for notes, practice and progress, instead of five apps and a folder of PDFs.

Running a product of our own also keeps us honest. Building, shipping and improving VUI Studify is the same work we do on client products, and it shows up in how we plan theirs. Try it at student.sulvatech.com.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/insights/cover-product.jpg$txt$,
        $txt$/insights/cover-product.jpg$txt$,
        $txt$https://student.sulvatech.com$txt$,
        $txt$VUI Studify: turning your own notes into practice$txt$,
        $txt$Students don't need another app to read in. They need one that tests them on their own material. What we built into VUI Studify, and why.$txt$,
        $txt$https://sulvatech.com/insights/vui-studify-ai-learning-platform$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-03-30T09:15:00Z'
    ),
    (
        $txt$a-personal-brand-site-is-not-an-online-cv$txt$,
        $txt$A personal brand site is not an online CV$txt$,
        $txt$Guides$txt$,
        $txt$Leaders get looked up before every important meeting. What a personal site should do in those two minutes, with the site we built for Olorunleke Ojuolape as an example.$txt$,
        $txt$If you lead a company, people look you up. Before a meeting, after an introduction, before they invest. What they find in those first two minutes shapes the conversation before you've said a word.

Most personal sites answer that moment with a CV: a list of roles and dates. That's useful to a recruiter and almost nobody else. A partner or investor wants to know three different things: what you're building, what you believe, and whether you're worth a conversation.

When we built the site for Olorunleke Ojuolape, MD/CEO of Mindfire Homes & Investments, we organised it around those questions. A portfolio of the work. Leadership and vision pages that say what he is building and why. And an insights section where his thinking is on the record, in his own words.

Writing does the heavy lifting. A short, well-argued post says more about how someone thinks than any list of titles, and it gives people something to share, which is how a personal brand travels.

The design should step back. Strong photography, generous space and clear type make a person look established. Busy layouts and stock images make them look like everyone else.

Then keep it alive. A personal site that never changes quietly tells visitors you've stopped paying attention. Plan for new posts and updates from day one, and make them easy enough that they actually happen.$txt$,
        $txt$Iyiola Ogunjobi$txt$,
        $txt$Founder, Sulva Tech$txt$,
        $txt$/work/olorunleke/poster.jpg$txt$,
        $txt$/work/olorunleke/poster.jpg$txt$,
        $txt$https://www.olorunleke.com$txt$,
        $txt$A personal brand site is not an online CV$txt$,
        $txt$Leaders get looked up before every important meeting. What a personal site should do in those two minutes, with the site we built for Olorunleke Ojuolape as an example.$txt$,
        $txt$https://sulvatech.com/insights/a-personal-brand-site-is-not-an-online-cv$txt$,
        $txt$published$txt$,
        false,
        true,
        '2026-10-04T09:00:00Z'
    )
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    image_url = EXCLUDED.image_url,
    og_image_url = EXCLUDED.og_image_url,
    website_url = EXCLUDED.website_url,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description,
    canonical_url = EXCLUDED.canonical_url,
    status = EXCLUDED.status,
    featured = EXCLUDED.featured,
    is_published = EXCLUDED.is_published,
    published_at = EXCLUDED.published_at,
    updated_at = timezone('utc'::text, now());

-- 3. Exactly one featured post.
UPDATE public.insights SET featured = (slug = 'why-every-site-comes-with-a-dashboard') WHERE featured OR slug = 'why-every-site-comes-with-a-dashboard';

COMMIT;

-- Check: the published list should now be the posts below, featured first.
SELECT slug, category, featured, published_at FROM public.insights
WHERE status = 'published' ORDER BY featured DESC, published_at DESC;
