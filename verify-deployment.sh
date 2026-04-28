#!/bin/bash

# Deployment Verification Script
# Run this before pushing to GitHub

echo "🔍 Verifying Deployment Readiness..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required files exist
echo "📁 Checking required files..."

files=(
  "public/og-image.svg"
  "public/robots.txt"
  "public/_headers"
  "public/_redirects"
  "app/sitemap.ts"
  ".github/workflows/deploy.yml"
  ".env.local.example"
  "README.md"
  "LAUNCH_CHECKLIST.md"
  "ACCESSIBILITY_REPORT.md"
)

all_files_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    all_files_exist=false
  fi
done

echo ""

# Check if test-components was removed
echo "🗑️  Checking removed files..."
if [ ! -f "app/test-components/page.tsx" ]; then
  echo -e "${GREEN}✓${NC} test-components route removed"
else
  echo -e "${RED}✗${NC} test-components route still exists"
  all_files_exist=false
fi

echo ""

# Check for console.logs
echo "🔍 Checking for console statements..."
console_count=$(grep -r "console\." --include="*.tsx" --include="*.ts" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out . | wc -l)
if [ "$console_count" -eq 0 ]; then
  echo -e "${GREEN}✓${NC} No console statements found"
else
  echo -e "${YELLOW}⚠${NC} Found $console_count console statements (review if needed)"
fi

echo ""

# Run build
echo "🏗️  Running production build..."
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Build successful"
else
  echo -e "${RED}✗${NC} Build failed"
  all_files_exist=false
fi

echo ""

# Check build output
echo "📦 Checking build output..."
if [ -d "out" ]; then
  size=$(du -sh out/ | cut -f1)
  echo -e "${GREEN}✓${NC} Build output exists (size: $size)"
  
  # Check for critical files in output
  if [ -f "out/robots.txt" ]; then
    echo -e "${GREEN}✓${NC} robots.txt in output"
  else
    echo -e "${RED}✗${NC} robots.txt missing from output"
  fi
  
  if [ -f "out/_headers" ]; then
    echo -e "${GREEN}✓${NC} _headers in output"
  else
    echo -e "${RED}✗${NC} _headers missing from output"
  fi
  
  if [ -f "out/sitemap.xml" ]; then
    echo -e "${GREEN}✓${NC} sitemap.xml in output"
  else
    echo -e "${RED}✗${NC} sitemap.xml missing from output"
  fi
else
  echo -e "${RED}✗${NC} Build output directory missing"
  all_files_exist=false
fi

echo ""

# Check environment variables
echo "🔐 Checking environment variables..."
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✓${NC} .env.local exists"
  
  required_vars=(
    "NEXT_PUBLIC_SITE_URL"
    "NEXT_PUBLIC_BKASH_NUMBER"
    "NEXT_PUBLIC_WHATSAPP_NUMBER"
    "NEXT_PUBLIC_SUPPORT_EMAIL"
  )
  
  for var in "${required_vars[@]}"; do
    if grep -q "$var=" .env.local; then
      echo -e "${GREEN}✓${NC} $var defined"
    else
      echo -e "${YELLOW}⚠${NC} $var not defined"
    fi
  done
else
  echo -e "${YELLOW}⚠${NC} .env.local not found (copy from .env.local.example)"
fi

echo ""

# Final summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$all_files_exist" = true ]; then
  echo -e "${GREEN}✅ All checks passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Review LAUNCH_CHECKLIST.md"
  echo "2. git add ."
  echo "3. git commit -m 'Phase 6 complete: Polish & Launch Prep'"
  echo "4. git push origin main"
  echo "5. Configure GitHub Secrets (see README.md)"
  echo "6. Create Cloudflare Pages project"
else
  echo -e "${RED}❌ Some checks failed${NC}"
  echo "Please fix the issues above before deploying"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
