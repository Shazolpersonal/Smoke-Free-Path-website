# 🚨 জরুরি: Token Revoke করুন এবং সঠিক Token তৈরি করুন

## ⚠️ নিরাপত্তা সতর্কতা!

আপনি আবারও token publicly share করেছেন! এই token এখনই revoke করুন।

---

## 🔴 সমস্যা:

বর্তমান token-এ সঠিক permissions নেই (403 Permission Denied error)।

---

## ✅ সমাধান - সঠিক Token তৈরি করুন:

### ধাপ ১: পুরানো Tokens Revoke করুন

1. যান: https://github.com/settings/tokens
2. সব পুরানো tokens খুঁজুন
3. প্রতিটি token-এর পাশে **Delete** ক্লিক করুন

### ধাপ ২: নতুন Token তৈরি করুন (সঠিক Permissions সহ)

1. যান: https://github.com/settings/tokens/new
2. **Note:** `Smoke-Free-Path-Full-Access`
3. **Expiration:** `90 days`
4. **Select scopes** - এই সবগুলো টিক দিন:
   
   ✅ **repo** (এটা expand করে সব sub-checkboxes দেখুন):
   - ✅ repo:status
   - ✅ repo_deployment
   - ✅ public_repo
   - ✅ repo:invite
   - ✅ security_events
   
   ✅ **workflow** ← এটা অবশ্যই দিতে হবে!
   
   ✅ **write:packages** (optional, কিন্তু recommended)
   
   ✅ **read:org** (যদি organization repository হয়)

5. নিচে scroll করে **Generate token** ক্লিক করুন
6. Token copy করুন এবং **নিরাপদ জায়গায়** save করুন

### ধাপ ৩: Token Test করুন

Terminal-এ:

```bash
# Token test করুন
curl -H "Authorization: token YOUR_NEW_TOKEN" https://api.github.com/user

# আপনার username দেখাবে মানে token ঠিক আছে
```

### ধাপ ৪: Workflow File Push করুন

```bash
# নতুন token দিয়ে push করুন
git push https://Shazolpersonal:YOUR_NEW_TOKEN@github.com/Shazolpersonal/Smoke-Free-Path-website.git main
```

অথবা interactive way:

```bash
# Credential helper দিয়ে
git config --global credential.helper store
git push

# Username: Shazolpersonal
# Password: [নতুন token paste করুন]
```

---

## 🎯 বর্তমান অবস্থা:

✅ Main code GitHub-এ আছে
✅ সব documentation push হয়েছে
⚠️ Workflow file local-এ আছে, push করতে হবে
⚠️ Token permissions ঠিক করতে হবে

---

## 📋 Workflow File Push হওয়ার পর:

### GitHub Actions Secrets Configure করুন:

1. যান: https://github.com/Shazolpersonal/Smoke-Free-Path-website/settings/secrets/actions
2. **New repository secret** ক্লিক করুন
3. এই secrets যোগ করুন:

**Cloudflare Secrets:**
```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

**Application Secrets:**
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BKASH_NUMBER=01977752579
NEXT_PUBLIC_NAGAD_NUMBER=01977752579
NEXT_PUBLIC_WHATSAPP_NUMBER=01977752579
NEXT_PUBLIC_SUPPORT_EMAIL=369niyyah@gmail.com
NEXT_PUBLIC_BUNDLE_PRICE=369
NEXT_PUBLIC_ORIGINAL_PRICE=963
NEXT_PUBLIC_CUSTOMER_LIMIT=963
```

**Optional Analytics:**
```
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

---

## 🌐 Cloudflare API Token পেতে:

1. যান: https://dash.cloudflare.com/profile/api-tokens
2. **Create Token** ক্লিক করুন
3. **Edit Cloudflare Workers** template select করুন
4. অথবা custom token তৈরি করুন এই permissions সহ:
   - Account → Cloudflare Pages → Edit
5. Token copy করুন

## 🆔 Cloudflare Account ID পেতে:

1. যান: https://dash.cloudflare.com
2. **Workers & Pages** ক্লিক করুন
3. ডান পাশে **Account ID** দেখাবে
4. Copy করুন

---

## 🚀 সব Setup হওয়ার পর:

প্রতিবার `main` branch-এ push করলে:
1. GitHub Actions automatically trigger হবে
2. Next.js build হবে
3. Cloudflare Pages-এ deploy হবে
4. আপনার site live হবে!

---

## 🔒 নিরাপত্তা Best Practices:

1. ❌ **কখনো token chat/email-এ share করবেন না**
2. ✅ Token শুধু terminal-এ paste করুন
3. ✅ Token expire date set করুন
4. ✅ শুধু প্রয়োজনীয় permissions দিন
5. ✅ Token accidentally expose হলে সাথে সাথে revoke করুন
6. ✅ Token password manager-এ save করুন (LastPass, 1Password, etc.)

---

## ❓ সমস্যা হলে:

### "403 Permission denied":
- Token-এ `repo` এবং `workflow` scope আছে কিনা check করুন
- Token expired হয়নি তো check করুন
- সঠিক repository access আছে কিনা verify করুন

### "Invalid username or token":
- Username: `Shazolpersonal` (case-sensitive)
- Token সঠিকভাবে copy করেছেন কিনা check করুন
- Token-এ কোনো space বা newline নেই তো check করুন

### "Repository not found":
- Repository public আছে কিনা check করুন
- Repository URL ঠিক আছে কিনা verify করুন

---

## 📞 এখন করুন:

1. ✅ **এখনই** পুরানো tokens revoke করুন
2. ✅ নতুন token তৈরি করুন (সঠিক permissions সহ)
3. ✅ Workflow file push করুন
4. ✅ GitHub Actions secrets configure করুন
5. ✅ Cloudflare Pages-এ deploy করুন

---

**শুভকামনা! 🚀**
