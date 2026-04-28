# 🔐 Token Update করুন (Workflow Support-এর জন্য)

## ⚠️ গুরুত্বপূর্ণ নিরাপত্তা সতর্কতা!

আপনার বর্তমান token এই conversation-এ publicly visible হয়ে গেছে।

**এখনই এই token revoke করুন এবং নতুন token তৈরি করুন!**

---

## 🚨 ধাপ ১: পুরানো Token Revoke করুন

1. যান: https://github.com/settings/tokens
2. আপনার token খুঁজুন
3. **Delete** বা **Revoke** ক্লিক করুন

---

## ✅ ধাপ ২: নতুন Token তৈরি করুন (Workflow Scope সহ)

1. যান: https://github.com/settings/tokens/new
2. Settings:
   - **Note:** `Smoke-Free-Path-Full-Access`
   - **Expiration:** `90 days`
   - **Select scopes:**
     - ✅ **repo** (সব sub-checkboxes)
     - ✅ **workflow** ← এটা গুরুত্বপূর্ণ!
3. **Generate token** ক্লিক করুন
4. Token copy করুন এবং **নিরাপদ জায়গায়** save করুন

---

## 🔄 ধাপ ৩: Workflow File Push করুন

নতুন token দিয়ে:

```bash
# Workflow file push করুন
git push https://Shazolpersonal:YOUR_NEW_TOKEN@github.com/Shazolpersonal/Smoke-Free-Path-website.git main
```

অথবা:

```bash
# Credential update করুন
git config --global credential.helper store
git push
# Username: Shazolpersonal
# Password: [নতুন token paste করুন]
```

---

## 🎯 বর্তমান অবস্থা:

✅ আপনার main code GitHub-এ আছে
✅ Repository: https://github.com/Shazolpersonal/Smoke-Free-Path-website
⚠️ Workflow file local-এ আছে, কিন্তু GitHub-এ push করতে হবে

---

## 🔒 নিরাপত্তা Tips:

1. **কখনো token publicly share করবেন না**
2. Token-এ শুধু প্রয়োজনীয় permissions দিন
3. Token expire হওয়ার date set করুন
4. Token নিরাপদ password manager-এ রাখুন
5. যদি accidentally expose হয়, সাথে সাথে revoke করুন

---

## 📊 Next Steps:

1. ✅ পুরানো token revoke করুন
2. ✅ নতুন token তৈরি করুন (workflow scope সহ)
3. ✅ Workflow file push করুন
4. ✅ GitHub Actions secrets configure করুন (deployment-এর জন্য)

---

**এখন উপরের steps follow করুন!**
