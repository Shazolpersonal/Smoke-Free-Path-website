# 🔐 GitHub Authentication Fix

## সমস্যা:
Password authentication আর supported নয়। আপনাকে Personal Access Token (PAT) ব্যবহার করতে হবে।

## সমাধান - দুটি উপায়:

---

## ✅ উপায় ১: Personal Access Token (PAT) ব্যবহার করুন (সহজ)

### ধাপ ১: GitHub-এ Personal Access Token তৈরি করুন

1. GitHub-এ যান: https://github.com/settings/tokens
2. **"Generate new token"** → **"Generate new token (classic)"** ক্লিক করুন
3. Token-এর তথ্য দিন:
   - **Note:** `Smoke-Free-Path-website`
   - **Expiration:** 90 days (অথবা আপনার পছন্দ)
   - **Select scopes:** শুধু **`repo`** checkbox টিক দিন (সব sub-checkboxes automatically select হবে)
4. নিচে scroll করে **"Generate token"** ক্লিক করুন
5. ⚠️ **গুরুত্বপূর্ণ:** Token copy করুন এবং নিরাপদ জায়গায় save করুন (এটা আর দেখাবে না!)

### ধাপ ২: Terminal-এ Push করুন

```bash
git push -u origin main
```

যখন username চাইবে:
- **Username:** `Shazolpersonal`
- **Password:** আপনার Personal Access Token paste করুন (যেটা copy করেছেন)

### ধাপ ৩: Credential Save করুন (পরবর্তীতে আর চাইবে না)

```bash
# Git credential helper enable করুন
git config --global credential.helper store

# এখন আবার push করুন
git push -u origin main
```

এবার username/token দিলে পরবর্তীতে আর চাইবে না।

---

## ✅ উপায় ২: SSH Key ব্যবহার করুন (আরো secure)

### ধাপ ১: SSH Key তৈরি করুন

```bash
# SSH key generate করুন
ssh-keygen -t ed25519 -C "369niyyah@gmail.com"

# Enter চাপুন (default location)
# Passphrase চাইলে Enter চাপুন (অথবা একটা password দিন)
```

### ধাপ ২: SSH Key GitHub-এ যোগ করুন

```bash
# Public key copy করুন
cat ~/.ssh/id_ed25519.pub
```

এই output copy করুন, তারপর:

1. GitHub-এ যান: https://github.com/settings/ssh/new
2. **Title:** `My Linux Machine`
3. **Key:** আপনার copy করা public key paste করুন
4. **Add SSH key** ক্লিক করুন

### ধাপ ৩: Remote URL পরিবর্তন করুন

```bash
# HTTPS থেকে SSH-তে পরিবর্তন করুন
git remote set-url origin git@github.com:Shazolpersonal/Smoke-Free-Path-website.git

# Verify করুন
git remote -v

# Push করুন
git push -u origin main
```

---

## 🎯 আমার সুপারিশ:

**নতুন users-এর জন্য:** উপায় ১ (Personal Access Token) সহজ এবং দ্রুত

**Long-term ব্যবহারের জন্য:** উপায় ২ (SSH Key) আরো secure এবং convenient

---

## ❓ সমস্যা হলে:

### "Permission denied" error:
```bash
# SSH key test করুন
ssh -T git@github.com
# "Hi Shazolpersonal!" দেখাবে মানে ঠিক আছে
```

### Token কাজ করছে না:
- Token-এ `repo` scope আছে কিনা check করুন
- Token expired হয়নি তো check করুন
- Username ঠিক আছে কিনা check করুন: `Shazolpersonal`

---

**এখন উপরের যেকোনো একটি উপায় follow করুন!**
