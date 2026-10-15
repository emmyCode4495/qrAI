# DocuMind AI – Document Intelligence Platform

AI-powered document understanding tool. Upload contracts, invoices, reports and get structured extraction, risk flags, and Q&A.

**Stack**
- Next.js 15 (App Router) + TypeScript + Tailwind
- Supabase (Auth + Database + Storage)
- Anthropic Claude (best current model for document intelligence)
- Credit-based usage pricing (coming next)

---

## Quick Start

### 1. Install dependencies

```bash
cd doc-intelligence
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Authentication → Providers** and enable:
   - Email
   - Google (add your Google OAuth credentials)
3. Copy your Project URL and anon key

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Current Status (MVP Progress)

- [x] Landing page (redesigned: "marked-up document" identity, live demo, light default + dark toggle)
- [x] Responsive dashboard shell with sidebar, credit meter and upload zone UI
- [x] Email + Password auth
- [x] Google OAuth
- [x] Protected dashboard
- [x] Credit display (placeholder)
- [ ] Document upload + storage (Supabase Storage)
- [ ] AI document analysis (Claude)
- [ ] Credit deduction system
- [ ] Document history & results view

---

## Next Steps We Will Build

1. Document upload to Supabase Storage
2. Text extraction (PDF → text)
3. Send to Claude for structured analysis
4. Save results + deduct credits
5. Results page with key fields, summary, risks, Q&A
