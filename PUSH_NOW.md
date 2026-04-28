# 🚀 এখনই Push করুন!

## ⚡ দ্রুততম উপায় (Personal Access Token):

### ১. Token তৈরি করুন:
👉 এই link-এ click করুন: https://github.com/settings/tokens/new

- **Note:** `Smoke-Free-Path`
- **Expiration:** `90 days`
- **Scopes:** শুধু ✅ `repo` টিক দিন
- **Generate token** ক্লিক করুন
- Token copy করুন (⚠️ এটা আর দেখাবে না!)

### ২. এই commands চালান:

```bash
# Credential save করার জন্য
git config --global credential.helper store

# Push করুন
git push -u origin main
```

### ৩. যখন চাইবে:
```
Username: Shazolpersonal
Password: [আপনার token paste করুন]
```

✅ **সম্পন্ন!** আপনার code GitHub-এ চলে যাবে!

---

## 🔐 অথবা SSH Key ব্যবহার করুন:

```bash
# এই script চালান
./setup-ssh.sh

# তারপর script-এ দেওয়া instructions follow করুন
```

---

## 📊 Push হওয়ার পর:

আপনার repository দেখুন:
👉 https://github.com/Shazolpersonal/Smoke-Free-Path-website

---

## ❓ সমস্যা হলে:

**"Invalid username or token":**
- Token-এ `repo` scope আছে কিনা check করুন
- Username: `Shazolpersonal` (ঠিক এভাবে)

**"Permission denied":**
- Token expired হয়নি তো check করুন
- নতুন token তৈরি করুন

**অন্য কোনো সমস্যা:**
- `AUTHENTICATION_FIX.md` file দেখুন বিস্তারিত জানতে

---

**এখন শুরু করুন! 🎉**
