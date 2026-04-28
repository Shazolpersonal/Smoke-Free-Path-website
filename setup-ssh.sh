#!/bin/bash

echo "🔐 Setting up SSH key for GitHub..."
echo ""

# Generate SSH key
echo "Step 1: Generating SSH key..."
ssh-keygen -t ed25519 -C "369niyyah@gmail.com" -f ~/.ssh/id_ed25519 -N ""

echo ""
echo "✅ SSH key generated!"
echo ""

# Start ssh-agent
echo "Step 2: Starting ssh-agent..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo ""
echo "✅ SSH key added to agent!"
echo ""

# Display public key
echo "Step 3: Your PUBLIC KEY (copy this):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat ~/.ssh/id_ed25519.pub
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📋 Next steps:"
echo "1. Copy the key above (the entire line)"
echo "2. Go to: https://github.com/settings/ssh/new"
echo "3. Title: 'My Linux Machine'"
echo "4. Paste the key"
echo "5. Click 'Add SSH key'"
echo ""
echo "Then run these commands:"
echo "  git remote set-url origin git@github.com:Shazolpersonal/Smoke-Free-Path-website.git"
echo "  git push -u origin main"
echo ""
