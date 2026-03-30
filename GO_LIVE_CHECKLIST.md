# Go-Live Checklist

## Ready In Code
- [x] Admin routes are protected with database-backed admin membership checks.
- [x] Contact and newsletter submissions are stored in Supabase.
- [x] Insights/blog content is fetched from the database.
- [x] Legal placeholder routes exist for privacy, terms, and cookies.
- [x] Contact and newsletter endpoints include basic rate limiting and stricter validation.
- [x] Next.js build warning about workspace root is addressed in config.

## Must Complete Before Launch
- [ ] Run [`supabase_schema.sql`](./supabase_schema.sql) in the target Supabase project.
- [ ] Insert at least one real admin user into `public.admin_users`.
- [ ] Restore production-safe env vars in `.env.local` or deployment secrets.
- [ ] Rotate any previously exposed Supabase or Resend keys.
- [ ] Verify the Resend sending domain and `CONTACT_FROM_EMAIL`.
- [ ] Replace placeholder homepage, about, work, and contact content with real company information.
- [ ] Replace placeholder portfolio entries and images with real case studies or client-approved summaries.
- [ ] Review seeded blog content and replace or extend it with editorially approved content.

## Recommended Before Launch
- [ ] Add analytics and consent tooling if tracking is required.
- [ ] Add error monitoring and uptime alerts.
- [ ] Add end-to-end tests for contact, newsletter, admin login, and blog rendering.
- [ ] Review copy, metadata, and OG assets for final brand consistency.
- [ ] Confirm domain, favicon, social links, and contact details are all real and current.

## Final Verification
- [ ] Run `npm run build`.
- [ ] Test public pages on desktop and mobile.
- [ ] Test contact submission, newsletter signup, admin login, and blog detail pages in production-like env.
- [ ] Verify email delivery and reply-to behavior.
- [ ] Verify that non-admin users cannot access `/admin`.
