
# Credit Dashboard

Production-ready Next.js 14 + TS client dashboard matching your reference layout.
- Tailwind + shadcn-like components
- Prisma (PostgreSQL by default, SQLite supported)
- NextAuth (email/password Credentials)
- File uploads to `./uploads` (dev), pluggable for S3
- PDF score extractor (pdf-parse) with bureau heuristics and regex fallback
- RBAC: CLIENT sees only their own data; STAFF/ADMIN can manage all clients
- CSV importer to create multiple Clients

## macOS quick start
1. `cp .env.example .env` and edit `DATABASE_URL`, `DB_PROVIDER`, `NEXTAUTH_*`, `FILE_STORAGE_ROOT`.
2. Install deps: `npm i`
3. Prisma: `npx prisma generate && npx prisma migrate dev --name init`
4. Seed admin: `npm run dev` then visit `/setup` once to create the first ADMIN (one-time route).
5. Start: `npm run dev` and open `http://localhost:3000`.

### Env keys
- `DATABASE_URL=`
- `NEXTAUTH_URL=`
- `NEXTAUTH_SECRET=`
- `FILE_STORAGE_ROOT=./uploads`

### Swap extractor to Azure Document Intelligence
The extractor is isolated in `lib/extractor.ts`. Replace `extractFromPdfBuffer()` implementation to:
1. Upload PDF to your blob storage (or send bytes).
2. Call Azure Doc Intelligence Analyze API.
3. Map `score` and `bureau` into the return shape: `{ score, bureau, scoreDate, rawText, confidences }`.
No other code paths change.

### Decisions
- Minimal shadcn subset replicated inline to avoid codegen steps.
- Payment methods are stored as plain text (UI only). No gateway calls.
- Empty states everywhere until data is created/imported.
