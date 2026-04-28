# GitHub-এ আপলোড করার সম্পূর্ণ গাইড

## ধাপ ১: GitHub-এ Repository তৈরি করুন

1. [GitHub.com](https://github.com) এ যান এবং লগইন করুন
2. উপরের ডান কোণে **"+"** ক্লিক করুন → **"New repository"** সিলেক্ট করুন
3. নিচের তথ্য দিন:
   - **Repository name:** `dhoya-mukto-poth`
   - **Description:** `ধোঁয়া-মুক্ত পথ - A mission to save lives from tobacco addiction`
   - **Visibility:** Public (সবাই দেখতে পারবে) অথবা Private (শুধু আপনি)
   - ⚠️ **গুরুত্বপূর্ণ:** নিচের checkboxes কোনোটাই চেক করবেন না:
     - ❌ "Add a README file"
     - ❌ "Add .gitignore"
     - ❌ "Choose a license"
4. **"Create repository"** বাটনে ক্লিক করুন

## ধাপ ২: Terminal-এ এই Commands চালান

Repository তৈরি হওয়ার পর GitHub আপনাকে কিছু command দেখাবে। আপনার terminal-এ এই commands চালান:

```bash
# Remote repository যোগ করুন (YOUR_USERNAME আপনার GitHub username দিয়ে replace করুন)
git remote add origin https://github.com/YOUR_USERNAME/dhoya-mukto-poth.git

# Code push করুন
git push -u origin main
```

### যদি SSH ব্যবহার করতে চান:

```bash
git remote add origin git@github.com:YOUR_USERNAME/dhoya-mukto-poth.git
git push -u origin main
```

## ধাপ ৩: Verify করুন

1. আপনার GitHub repository page-এ যান
2. দেখুন সব files সঠিকভাবে upload হয়েছে কিনা
3. README.md file automatically display হবে

## ⚠️ Security Check

নিশ্চিত করুন যে sensitive information push হয়নি:

✅ `.env.local` file push হয়নি (এটি `.gitignore`-এ আছে)
✅ শুধু `.env.local.example` push হয়েছে (যেটা safe)

## পরবর্তী Steps (Optional)

### Cloudflare Pages-এ Deploy করতে চাইলে:

1. [Cloudflare Dashboard](https://dash.cloudflare.com) এ যান
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. আপনার GitHub repository select করুন
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Environment variables যোগ করুন (`.env.local.example` থেকে)
6. **Save and Deploy** ক্লিক করুন

### GitHub Actions Setup (Automatic Deployment):

আপনার repository-তে ইতিমধ্যে `.github/workflows/deploy.yml` আছে। এটি activate করতে:

1. GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. এই secrets যোগ করুন:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - সব `NEXT_PUBLIC_*` variables

এখন প্রতিবার `main` branch-এ push করলে automatically deploy হবে!

## সাহায্য প্রয়োজন?

যদি কোনো সমস্যা হয়:

1. **"Permission denied" error:** SSH key setup করুন অথবা HTTPS ব্যবহার করুন
2. **"Repository not found":** Username এবং repository name check করুন
3. **"Failed to push":** `git pull origin main --rebase` চালিয়ে তারপর আবার push করুন

---

**সফলতা কামনা করছি! 🚀**
