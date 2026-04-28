#!/bin/bash

echo "🚀 Pushing Workflow File to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if workflow file exists
if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ Error: Workflow file not found!"
    echo "   Expected: .github/workflows/deploy.yml"
    exit 1
fi

echo "✅ Workflow file found"
echo ""

# Check if there are uncommitted changes
if ! git diff --quiet HEAD; then
    echo "📝 Uncommitted changes detected"
    echo ""
fi

# Show current status
echo "📊 Current Git Status:"
git status --short
echo ""

# Prompt for token
echo "🔑 Please enter your GitHub Personal Access Token:"
echo "   (Token must have 'repo' and 'workflow' scopes)"
echo ""
read -s -p "Token: " GITHUB_TOKEN
echo ""
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: Token cannot be empty!"
    exit 1
fi

echo "🔄 Pushing to GitHub..."
echo ""

# Push to GitHub
git push https://Shazolpersonal:${GITHUB_TOKEN}@github.com/Shazolpersonal/Smoke-Free-Path-website.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ SUCCESS! Workflow file pushed to GitHub!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📍 Repository: https://github.com/Shazolpersonal/Smoke-Free-Path-website"
    echo ""
    echo "🎯 Next Steps:"
    echo "   1. Configure GitHub Actions secrets"
    echo "   2. Go to: https://github.com/Shazolpersonal/Smoke-Free-Path-website/settings/secrets/actions"
    echo "   3. Add required secrets (see FINAL_STEPS.md)"
    echo ""
    echo "🚀 After adding secrets, every push will auto-deploy to Cloudflare Pages!"
    echo ""
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ FAILED! Could not push to GitHub"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Common issues:"
    echo "   • Token doesn't have 'workflow' scope"
    echo "   • Token doesn't have 'repo' scope"
    echo "   • Token is expired or revoked"
    echo "   • Wrong username or repository name"
    echo ""
    echo "📖 See FINAL_STEPS.md for detailed instructions"
    echo ""
    exit 1
fi
