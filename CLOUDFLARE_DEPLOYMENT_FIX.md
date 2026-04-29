# Cloudflare Deployment সমস্যা এবং সমাধান

## সমস্যা কী ছিল?

Cloudflare Pages-এ ডিপ্লয়মেন্ট ব্যর্থ হয়েছিল এই error-এর কারণে:

```
Error: ENOENT: no such file or directory, open '/opt/buildhome/repo/.next/standalone/.next/server/pages-manifest.json'
```

### মূল কারণ:

1. **Next.js config ভুল ছিল**: `output: 'export'` ছিল, কিন্তু OpenNext Cloudflare-এর জন্য `output: 'standalone'` প্রয়োজন
2. **প্রয়োজনীয় config ফাইল ছিল না**: `wrangler.json` এবং `open-next.config.ts` ফাইল তৈরি হয়নি
3. **Dependencies ইনস্টল ছিল না**: `@opennextjs/cloudflare` এবং `wrangler` package ইনস্টল ছিল না

## কী পরিবর্তন করা হয়েছে?

### 1. Next.js Configuration (`next.config.ts`)
```typescript
// আগে:
output: 'export'

// এখন:
output: 'standalone'
```

### 2. নতুন ফাইল তৈরি করা হয়েছে:

#### `wrangler.json`
Cloudflare Workers-এর জন্য configuration

#### `open-next.config.ts`
OpenNext Cloudflare adapter-এর জন্য configuration

#### `.dev.vars`
Local development-এর জন্য environment variables

### 3. Dependencies যোগ করা হয়েছে:
```bash
npm install --save-dev @opennextjs/cloudflare wrangler
```

### 4. Package.json Scripts যোগ করা হয়েছে:
```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
```

### 5. `.gitignore` আপডেট করা হয়েছে:
```
.wrangler/
.open-next/
wrangler.toml
.dev.vars
```

## এখন কী করতে হবে?

### Local-এ Test করুন:
```bash
npm run preview
```

### Cloudflare-এ Deploy করুন:

#### Option 1: Cloudflare Pages (Recommended)
1. GitHub-এ push করুন
2. Cloudflare Pages dashboard-এ যান
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Framework preset: `Next.js`

#### Option 2: Cloudflare Workers (Direct Deploy)
```bash
npm run deploy
```

## Important Notes:

1. **Static Export থেকে Standalone-এ পরিবর্তন**: এখন আপনার সাইট server-side rendering (SSR) support করবে
2. **Environment Variables**: যদি কোনো secret keys থাকে, সেগুলো Cloudflare dashboard-এ add করতে হবে
3. **Caching**: OpenNext Cloudflare automatic caching setup করবে

## Troubleshooting:

যদি এখনও সমস্যা হয়:

1. `.next` folder delete করুন এবং আবার build করুন:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Node modules reinstall করুন:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Cloudflare Pages-এ environment variables check করুন

## পরবর্তী ধাপ:

✅ Local-এ test করুন (`npm run preview`)
✅ GitHub-এ push করুন
✅ Cloudflare Pages-এ reconnect করুন
✅ Deploy করুন এবং verify করুন
