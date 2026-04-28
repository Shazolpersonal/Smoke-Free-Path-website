# Brand Guide — Dhoya-Mukto Poth (ধোঁয়া-মুক্ত পথ)

## Brand Identity

### Master Brand
**ধোঁয়া-মুক্ত পথ** (Dhoya-Mukto Poth) / Smoke-Free Path

### Bundle Name
**ধোঁয়া-মুক্ত পথ | সম্পূর্ণ যাত্রা**  
(Smoke-Free Path | Complete Journey)

### Taglines

**Bengali (Primary):**  
"শেষ সিগারেট থেকে নতুন জীবনের পথে"

**English (Secondary):**  
"From Your Last Cigarette to a New Beginning"

## Brand Voice — 4 Modes

The voice must shift intelligently by section to match the emotional context:

| Mode | When to Use | Example | Tone Characteristics |
|------|-------------|---------|---------------------|
| 🚨 **Alarming-Compassionate** | Pain/reality sections | "প্রতিটি সিগারেট আপনার থেকে ১১ মিনিট জীবন কেড়ে নিচ্ছে।" | Factual, urgent, but caring |
| 🤝 **Friendly-Hopeful** | Solution sections | "ভয় পাবেন না ভাই। আমরা একসাথে হাঁটব।" | Warm, encouraging, brotherly |
| 🕌 **Spiritually-Reverent** | Islamic/story sections | "আল্লাহ আপনার তওবা কবুল করুন। আপনার শরীর আমানত।" | Respectful, sacred, humble |
| ✅ **Confident-Firm** | CTA sections | "আজই নিন। কাল কি আসবে — কে জানে?" | Direct, decisive, honest |

## Voice Rules (CRITICAL)

### NEVER Use:
- Aggressive sales language ("limited offer!", "buy now!!", "hurry!!!")
- Fake urgency or scarcity tactics
- Countdown timers
- Manipulative dark patterns
- Disrespectful informal address (তুমি)
- Hype or exaggeration

### ALWAYS Use:
- Dignified, respectful address (আপনি)
- Occasional familial terms ("ভাই/বোন") when appropriate
- Spiritual-emotional appeal over commercial pressure
- Honest, transparent language
- Treat visitor as family member we genuinely want to help

### Tone Principles:
1. **Dignity over conversion** — If a pattern converts 2x but feels manipulative, reject it
2. **Silence is sacred** — Let whitespace and emotion breathe
3. **Truth over persuasion** — State facts, let visitor decide
4. **Family over customer** — Would you say this to your own brother?

## Color System

### Primary Palette

```css
--color-emerald-deep: #0F5132    /* Primary brand, trust, Islamic green */
--color-gold-royal:   #D4A017    /* CTA, achievement, reward */
--color-blue-serenity: #1E6091   /* Calm, breathing sections */
--color-white-pure:   #FAFAF7    /* Clean backgrounds */
--color-charcoal:     #1A1A1A    /* Body text */
```

### Accent Palette (Use Sparingly)

```css
--color-red-alert:    #B8342D    /* Danger stats only (2-3 uses max) */
--color-orange-sunrise: #E07A3B  /* New beginnings, hope */
--color-mint-fresh:   #6FB897    /* Light accents, success states */
```

### Color Usage Rules

| Element | Color | Notes |
|---------|-------|-------|
| Hero background | Emerald-deep gradient | Add gold accents |
| Primary CTA buttons | Gold-royal | White text, subtle shadow |
| Secondary CTA buttons | Outlined emerald | Transparent background |
| Pain/warning sections | Red-alert | ONLY for stats/numbers |
| Breathing app feature | Blue-serenity | Calming theme |
| Islamic quotes/hadith | Emerald background | Gold border, white text |
| Body text | Charcoal on white | Maximum readability |
| Links | Emerald-deep | Underline on hover |

### Color Psychology

- **Emerald-deep:** Trust, growth, Islamic tradition, nature, healing
- **Gold-royal:** Value, achievement, reward, premium quality
- **Blue-serenity:** Calm, peace, breath, meditation
- **Red-alert:** Urgency, danger, wake-up call (use minimally)

## Typography

### Font Families

```css
/* Bengali Headlines */
font-family: 'Hind Siliguri', sans-serif;
font-weight: 700;

/* Bengali Body */
font-family: 'Noto Sans Bengali', sans-serif;
font-weight: 400-500;

/* English Headlines */
font-family: 'Playfair Display', serif;
font-weight: 700;
/* Elegant, dignified, classical */

/* English Body */
font-family: 'Inter', sans-serif;
font-weight: 400-500;
/* Modern, clean, highly readable */

/* Arabic (Hadith/Quran) */
font-family: 'Amiri', serif;
font-weight: 400;
/* Classical Quranic style */
```

### Font Loading
- All fonts loaded from Google Fonts
- Use `display=swap` for performance
- Fallback to system fonts during load

### Type Scale

| Element | Mobile | Desktop | Weight |
|---------|--------|---------|--------|
| H1 (Hero) | 52px | 72px | 700 |
| H2 (Section) | 36px | 48px | 700 |
| H3 (Subsection) | 24px | 32px | 700 |
| Body Large | 18px | 20px | 400 |
| Body | 16px | 18px | 400 |
| Small | 14px | 14px | 400 |
| Micro | 12px | 12px | 400 |

### Typography Rules

1. **Line Height:** 1.6 for body text, 1.2 for headlines
2. **Letter Spacing:** Normal for Bengali, slight tracking for English headlines
3. **Text Alignment:** Left-aligned for body (better readability), center for headlines
4. **Contrast:** Minimum WCAG AA (4.5:1 for body, 3:1 for large text)

## Target Personas

### Persona 1: "হতাশ ধূমপায়ী রফিক" (The Exhausted Smoker)

**Demographics:**
- Age: 35
- Family: Father of 2
- Occupation: Middle-class worker
- Smoking history: 15+ years, tried quitting 10+ times

**Pain Points:**
- Deep shame about inability to quit
- Feels weak and powerless
- Fear of leaving family early (health anxiety)
- Financial burden of smoking
- Religious guilt

**Triggers:**
- Doctor's warning about health
- Ramadan (spiritual renewal period)
- Family illness or death
- Child asking "Why do you smoke, Abbu?"

**Internal Voice:**
"আমি কি পারব? আল্লাহ তাওফিক দিন।"  
(Can I do this? May Allah give me strength.)

**What He Needs:**
- Hope without judgment
- Practical, step-by-step path
- Spiritual support
- Immediate relief tools for cravings

### Persona 2: "চিন্তিত স্ত্রী সালমা" (The Worried Wife)

**Demographics:**
- Age: 30
- Family: Married, 1-2 children
- Situation: Husband smokes heavily
- Fear: Widowhood, children growing up without father

**Pain Points:**
- Cannot directly confront husband (cultural dynamics)
- Fears arguments about smoking
- Feels helpless watching him harm himself
- Worried about secondhand smoke affecting children
- Financial stress from smoking expenses

**Triggers:**
- Husband's persistent cough
- Seeing other families lose fathers to smoking
- Children asking about father's health
- Finding a gentle, non-confrontational solution

**Internal Voice:**
"আমি কীভাবে তাকে বাঁচাব? সরাসরি বললে রাগ করবে।"  
(How can I save him? He'll get angry if I confront him directly.)

**What She Needs:**
- A gift she can present lovingly
- Something that doesn't feel like nagging
- Spiritual framing (sadaqah, care for amana)
- Hope that change is possible

### Persona 3: "দ্বীনদার বন্ধু কামাল" (The Caring Friend)

**Demographics:**
- Age: 25
- Identity: Religiously motivated, active in community
- Situation: Has friends/family who smoke
- Motivation: Amr bil maruf (enjoining good)

**Pain Points:**
- Feels religious responsibility to help others
- Wants to do dawah without being preachy
- Seeks sadaqah jariyah (continuous charity)
- Limited budget but generous heart

**Triggers:**
- Seeing friends harm themselves
- Desire to earn continuous reward
- Ramadan and other spiritual occasions
- Death of someone from smoking-related illness

**Internal Voice:**
"যদি আমি একজনকে বাঁচাতে পারি, এটা সদকায়ে জারিয়া হবে।"  
(If I can save one person, this will be continuous charity.)

**What He Needs:**
- Affordable gift option
- Islamic framing (sadaqah jariyah)
- Easy sharing mechanism
- Confidence that it actually works

## Design Implications from Personas

### Dual CTA Strategy
The site MUST have two equally prominent CTAs:
1. **"নিজের জন্য কিনুন"** (Buy for yourself) — For Persona 1
2. **"প্রিয়জনকে উপহার দিন"** (Gift to loved one) — For Personas 2 & 3

### Messaging Strategy
- **For smokers:** Hope, no judgment, practical path
- **For gift-givers:** Sadaqah jariyah, gentle intervention, love
- **For all:** Spiritual framing, family values, dignity

### Emotional Journey
1. Recognition (Pain Mirror) — "This is me"
2. Reality (Harsh Truth) — "This is serious"
3. Hope (New Path) — "There is a way"
4. Connection (Story) — "Someone understands"
5. Decision (CTA) — "I'm ready" or "I'll help someone"

## Brand Personality

If this brand were a person:

- **Wise older brother** who has been through struggle
- **Compassionate imam** who never judges
- **Skilled doctor** who tells hard truths with kindness
- **Loyal friend** who walks beside you, not ahead

## Brand Promise

"আমরা শুধু বিক্রি করতে আসিনি। আমরা সত্যিই মানুষকে সাহায্য করতে এসেছি।"

*We didn't come just to sell. We came to genuinely help people.*

This promise is backed by:
- 41-day money-back guarantee
- Lifetime updates
- Honest pricing
- No subscription traps
- Respectful communication
