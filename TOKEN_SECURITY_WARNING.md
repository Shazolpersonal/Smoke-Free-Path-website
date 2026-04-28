# 🚨 URGENT: Token Security Warning

## ⚠️ আপনার Token Compromised হয়েছে!

আপনি দুইবার GitHub Personal Access Token publicly share করেছেন:
1. প্রথম token: `ghp_sW2Zzfb...`
2. দ্বিতীয় token: `github_pat_11AW6JLII0...`

**এই tokens এখনই revoke করুন!**

---

## 🔴 কেন এটি বিপজ্জনক?

যে কেউ এই tokens ব্যবহার করে:
- ✗ আপনার repository-তে code push করতে পারে
- ✗ Code delete করতে পারে
- ✗ Repository settings পরিবর্তন করতে পারে
- ✗ Malicious code inject করতে পারে
- ✗ আপনার নামে commits করতে পারে

---

## ✅ এখনই করুন (5 মিনিট):

### ধাপ ১: সব Tokens Revoke করুন

1. **এখনই** এই link-এ যান: https://github.com/settings/tokens
2. সব tokens দেখুন
3. প্রতিটি token-এর পাশে **Delete** ক্লিক করুন
4. Confirm করুন

### ধাপ ২: নতুন Token তৈরি করুন (সঠিকভাবে)

1. যান: https://github.com/settings/tokens/new
2. **Note:** `Smoke-Free-Path-Secure`
3. **Expiration:** `90 days`
4. **Scopes:**
   - ✅ `repo` (সব sub-options)
   - ✅ `workflow`
5. **Generate token**
6. Token copy করুন

### ধাপ ৩: Token নিরাপদে Save করুন

**✅ সঠিক উপায়:**
- Password manager ব্যবহার করুন (LastPass, 1Password, Bitwarden)
- Encrypted file-এ save করুন
- শুধু local machine-এ রাখুন

**❌ ভুল উপায়:**
- Chat/email-এ share করবেন না
- Screenshot নেবেন না
- Plain text file-এ save করবেন না
- Cloud storage-এ রাখবেন না (Google Drive, Dropbox)

### ধাপ ৪: Token ব্যবহার করুন

```bash
# এই script চালান
./push-workflow.sh

# অথবা manually:
git push
# Username: Shazolpersonal
# Password: [নতুন token paste করুন]
```

---

## 🔒 ভবিষ্যতে Token নিরাপদ রাখতে:

### 1. SSH Keys ব্যবহার করুন (Best Practice)

```bash
# SSH key তৈরি করুন
ssh-keygen -t ed25519 -C "369niyyah@gmail.com"

# Public key copy করুন
cat ~/.ssh/id_ed25519.pub

# GitHub-এ add করুন: https://github.com/settings/ssh/new
```

তারপর:
```bash
# Remote URL পরিবর্তন করুন
git remote set-url origin git@github.com:Shazolpersonal/Smoke-Free-Path-website.git

# Push করুন (কোনো token লাগবে না!)
git push
```

### 2. GitHub CLI ব্যবহার করুন

```bash
# Install GitHub CLI
sudo apt install gh

# Login করুন
gh auth login

# Push করুন
git push
```

### 3. Credential Manager ব্যবহার করুন

```bash
# Git credential helper
git config --global credential.helper store

# প্রথমবার token দিন, পরে আর লাগবে না
```

---

## 📊 Token Permissions চেক করুন

আপনার token-এ কী কী permissions আছে দেখতে:

```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
```

---

## 🎯 Current Status:

✅ Main code GitHub-এ আছে
✅ Documentation push হয়েছে
⚠️ Workflow file push করতে হবে (সঠিক token দিয়ে)
🚨 পুরানো tokens revoke করতে হবে

---

## 📞 সাহায্য প্রয়োজন?

- GitHub Docs: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
- Token Security: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation

---

## ✅ Checklist:

- [ ] পুরানো tokens revoke করেছি
- [ ] নতুন token তৈরি করেছি (সঠিক scopes সহ)
- [ ] Token password manager-এ save করেছি
- [ ] Workflow file push করেছি
- [ ] GitHub Actions secrets configure করেছি
- [ ] SSH key setup করেছি (optional কিন্তু recommended)

---

**এখনই tokens revoke করুন! ⏰**
