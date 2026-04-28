# 🚀 Quick Reference Card

## 📍 Repository URL
https://github.com/Shazolpersonal/Smoke-Free-Path-website

---

## 🚨 জরুরি কাজ (এখনই!)

```bash
# 1. Tokens revoke করুন
# যান: https://github.com/settings/tokens

# 2. নতুন token তৈরি করুন (repo + workflow scope)
# যান: https://github.com/settings/tokens/new

# 3. Workflow file push করুন
./push-workflow.sh
```

---

## 📝 Daily Commands

```bash
# Code update করুন
git add .
git commit -m "Your message"
git push

# Status check করুন
git status

# Recent commits দেখুন
git log --oneline -5

# Remote check করুন
git remote -v
```

---

## 🔧 Setup Commands (One-time)

```bash
# Git config
git config --global user.name "Shazol"
git config --global user.email "369niyyah@gmail.com"
git config --global credential.helper store

# SSH key setup (recommended)
ssh-keygen -t ed25519 -C "369niyyah@gmail.com"
cat ~/.ssh/id_ed25519.pub
# Add to: https://github.com/settings/ssh/new

# Change to SSH
git remote set-url origin git@github.com:Shazolpersonal/Smoke-Free-Path-website.git
```

---

## 🌐 Deployment

### Cloudflare Pages (Manual)
1. https://dash.cloudflare.com
2. Workers & Pages → Create → Connect Git
3. Build: `npm run build`
4. Output: `out`

### GitHub Actions (Automatic)
1. Push workflow file
2. Add secrets: https://github.com/Shazolpersonal/Smoke-Free-Path-website/settings/secrets/actions
3. Push to main → auto-deploy!

---

## 🔑 Required Secrets

```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_BKASH_NUMBER
NEXT_PUBLIC_NAGAD_NUMBER
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_SUPPORT_EMAIL
NEXT_PUBLIC_BUNDLE_PRICE
NEXT_PUBLIC_ORIGINAL_PRICE
NEXT_PUBLIC_CUSTOMER_LIMIT
```

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `TOKEN_SECURITY_WARNING.md` | 🚨 Security alert |
| `FINAL_STEPS.md` | Complete setup guide |
| `push-workflow.sh` | Automated push script |
| `SUCCESS_SUMMARY.md` | Current status |
| `.github/workflows/deploy.yml` | Auto-deployment |

---

## 🆘 Troubleshooting

### "Permission denied"
```bash
# Check token scopes
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
```

### "Authentication failed"
```bash
# Reset credentials
git config --global --unset credential.helper
git config --global credential.helper store
git push
```

### "Workflow scope required"
- Token needs `workflow` scope
- Create new token: https://github.com/settings/tokens/new

---

## 📞 Quick Links

- **Tokens:** https://github.com/settings/tokens
- **SSH Keys:** https://github.com/settings/ssh/new
- **Secrets:** https://github.com/Shazolpersonal/Smoke-Free-Path-website/settings/secrets/actions
- **Actions:** https://github.com/Shazolpersonal/Smoke-Free-Path-website/actions
- **Cloudflare:** https://dash.cloudflare.com

---

## ✅ Checklist

- [ ] Tokens revoked
- [ ] New token created (repo + workflow)
- [ ] Workflow file pushed
- [ ] GitHub secrets configured
- [ ] Cloudflare connected
- [ ] First deployment successful
- [ ] SSH key setup (optional)

---

**Print this and keep it handy! 📌**
