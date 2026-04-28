# ✅ Pre-Push Checklist

GitHub-এ push করার আগে এই checklist follow করুন:

## 🔒 Security Check

- [x] `.env.local` file `.gitignore`-এ আছে
- [x] `.env.local.example` আছে (sensitive data ছাড়া)
- [ ] কোনো API keys, passwords, বা tokens code-এ hardcoded নেই
- [ ] Personal phone numbers বা emails code-এ নেই (শুধু env variables-এ আছে)

**Verify করুন:**
```bash
# Check if .env.local is ignored
git status | grep ".env.local"
# কিছু দেখাবে না মানে ঠিক আছে
```

## 📦 Build Check

- [x] Build successful: `out/` folder আছে (2.9MB)
- [ ] Local-এ test করেছেন: `npm run dev`
- [ ] Production build test করেছেন: `npm run build && npx serve out`

**Current build size:** 2.9MB ✅

## 📝 Documentation Check

- [x] README.md updated
- [x] Environment variables documented
- [x] Deployment instructions আছে
- [x] Project structure documented

## 🎯 Code Quality

- [ ] No console.log() statements (production code-এ)
- [ ] No commented-out code blocks
- [ ] All TODO comments addressed অথবা documented
- [ ] TypeScript errors নেই: `npm run build`

**Check করুন:**
```bash
npm run build
# কোনো error থাকলে fix করুন
```

## 📊 Recent Commits

আপনার সর্বশেষ commits:
```
b7eb409 Phase 6 complete: Polish & Launch Prep
bcac6fe Initial commit from Create Next App
```

## 🚀 Ready to Push?

যদি সব ✅ হয়, তাহলে:

```bash
# 1. GitHub-এ repository তৈরি করুন
# 2. Remote add করুন:
git remote add origin https://github.com/YOUR_USERNAME/dhoya-mukto-poth.git

# 3. Push করুন:
git push -u origin main
```

## ⚠️ Important Notes

1. **First time push:** `-u origin main` ব্যবহার করুন
2. **Subsequent pushes:** শুধু `git push` যথেষ্ট
3. **Large files:** 100MB-এর বড় files GitHub-এ push করা যায় না
4. **Sensitive data:** একবার push হলে history থেকে remove করা কঠিন

## 🔍 Final Verification Commands

```bash
# Check what will be pushed
git log origin/main..HEAD 2>/dev/null || echo "No remote configured yet"

# Check file sizes
find . -type f -size +10M -not -path "./node_modules/*" -not -path "./.git/*"

# Check for sensitive patterns
git grep -i "password\|secret\|api_key" -- ':!*.md' ':!node_modules'
```

---

**সব ঠিক থাকলে push করুন! 🎉**
