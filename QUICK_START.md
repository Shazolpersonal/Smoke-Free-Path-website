# 🚀 Quick Start - GitHub Upload

## এক নজরে পুরো Process:

### 1️⃣ GitHub-এ Repository তৈরি করুন

- যান: https://github.com/new
- Name: `dhoya-mukto-poth`
- Description: `ধোঁয়া-মুক্ত পথ - A mission to save lives from tobacco addiction`
- Visibility: Public অথবা Private
- ⚠️ কোনো checkbox চেক করবেন না
- Click: **Create repository**

### 2️⃣ Terminal-এ এই Commands চালান:

```bash
# আপনার GitHub username দিয়ে YOUR_USERNAME replace করুন
git remote add origin https://github.com/YOUR_USERNAME/dhoya-mukto-poth.git

# Code push করুন
git push -u origin main
```

### 3️⃣ সম্পন্ন! ✅

আপনার code এখন GitHub-এ আছে!

---

## 🌐 Cloudflare Pages-এ Deploy করতে চাইলে:

### Option A: Cloudflare Dashboard থেকে (সহজ)

1. যান: https://dash.cloudflare.com
2. **Workers & Pages** → **Create application** → **Pages**
3. **Connect to Git** → আপনার GitHub repository select করুন
4. Build settings:
   ```
   Build command: npm run build
   Build output directory: out
   ```
5. **Environment variables** যোগ করুন (নিচে দেখুন)
6. **Save and Deploy**

### Option B: GitHub Actions দিয়ে (Automatic)

1. GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** ক্লিক করে এই secrets যোগ করুন:

**Required Secrets:**
```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BKASH_NUMBER=01977752579
NEXT_PUBLIC_NAGAD_NUMBER=01977752579
NEXT_PUBLIC_WHATSAPP_NUMBER=01977752579
NEXT_PUBLIC_SUPPORT_EMAIL=369niyyah@gmail.com
NEXT_PUBLIC_BUNDLE_PRICE=369
NEXT_PUBLIC_ORIGINAL_PRICE=963
NEXT_PUBLIC_CUSTOMER_LIMIT=963
```

**Optional Secrets:**
```
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

3. এখন প্রতিবার `main` branch-এ push করলে automatically deploy হবে!

---

## 📝 পরবর্তী Updates Push করতে:

```bash
# Changes করুন
git add .
git commit -m "Your commit message"
git push
```

---

## ❓ সমস্যা হলে:

### "Permission denied (publickey)" Error:
```bash
# HTTPS ব্যবহার করুন SSH-এর বদলে
git remote set-url origin https://github.com/YOUR_USERNAME/dhoya-mukto-poth.git
```

### "Repository not found" Error:
- Username এবং repository name ঠিক আছে কিনা check করুন
- Repository public করেছেন কিনা check করুন

### Push করতে সমস্যা:
```bash
git pull origin main --rebase
git push
```

---

**বিস্তারিত guide:** `GITHUB_UPLOAD_GUIDE.md` দেখুন
