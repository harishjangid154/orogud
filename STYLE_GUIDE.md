# OROGUD Visual Style Guide

## 🎨 Brand Essence

**OROGUD** is a premium organic lifestyle brand that embodies:
- **Trust** through clean, minimal design
- **Warmth** through earthy, neutral tones
- **Quality** through premium spacing and typography
- **Simplicity** through clear hierarchy and breathing room
- **Authenticity** through honest, straightforward communication

---

## 🌈 Color System

### Primary Palette

#### Warm Off-White Background
```
Color: #FAF7F3
Usage: Page backgrounds, large sections
Mood: Inviting, warm, approachable
Contrast: High contrast with text
```

#### Pure White Surface
```
Color: #FFFFFF
Usage: Cards, panels, surfaces
Mood: Clean, fresh, premium
Contrast: Maximum contrast
```

#### Deep Charcoal Text
```
Color: #1F2326
Usage: Primary text, headings
Mood: Professional, readable, trustworthy
Contrast: Excellent on light backgrounds
```

### Secondary Palette

#### Medium Gray (Muted)
```
Color: #585C5F
Usage: Secondary text, descriptions
Mood: Subtle, supportive
Contrast: Good on light backgrounds
```

#### Light Gray (Subtle)
```
Color: #8C8F92
Usage: Tertiary text, captions
Mood: Minimal, refined
Contrast: Acceptable on light backgrounds
```

#### Warm Border
```
Color: #E8E5E1
Usage: Borders, dividers, subtle lines
Mood: Soft, warm, integrated
Contrast: Subtle, doesn't dominate
```

### Accent Colors (Theme-Switchable)

#### Terracotta (Default)
```
Primary: #B86C4A
Dark: #994F37
Light: #F5E8E0
Usage: CTAs, highlights, interactive elements
Mood: Warm, organic, earthy
```

#### Teal (Alternative)
```
Primary: #4F7E7A
Dark: #35615F
Light: #E8F1F0
Usage: CTAs, highlights, interactive elements
Mood: Cool, modern, sophisticated
```

### Status Colors

#### Success
```
Color: #2E7D4B
Usage: Success messages, confirmations
Mood: Positive, growth, healthy
```

#### Warning
```
Color: #C0844B
Usage: Warning messages, cautions
Mood: Attention, careful, important
```

#### Danger
```
Color: #B44A4A
Usage: Error messages, destructive actions
Mood: Alert, stop, critical
```

---

## 🔤 Typography System

### Font Family
- **Primary**: System fonts (San Francisco, Segoe UI, Roboto)
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif
- **Philosophy**: Clean, modern, highly readable

### Heading Hierarchy

#### H1 - Page Title
```
Size: 2rem (32px) / 3rem (48px) / 5rem (80px)
Weight: 700 (Bold)
Line Height: 1.2
Usage: Main page headings, hero titles
Mood: Large, commanding, important
```

#### H2 - Section Title
```
Size: 1.5rem (24px) / 2rem (32px)
Weight: 700 (Bold)
Line Height: 1.3
Usage: Section headings, subsections
Mood: Clear, organized, hierarchical
```

#### H3 - Subsection Title
```
Size: 1.25rem (20px)
Weight: 700 (Bold)
Line Height: 1.4
Usage: Content subsections, card titles
Mood: Supportive, organized
```

#### H4 - Minor Title
```
Size: 1.1rem (18px)
Weight: 700 (Bold)
Line Height: 1.4
Usage: Small sections, sidebar titles
Mood: Subtle, organized
```

### Body Text

#### Lead Text
```
Size: 1.125rem (18px)
Weight: 400 (Regular)
Line Height: 1.6
Color: Muted
Usage: Introductions, summaries, descriptions
Mood: Friendly, approachable, readable
```

#### Body Text
```
Size: 1rem (16px)
Weight: 400 (Regular)
Line Height: 1.7
Color: Text
Usage: Main content, paragraphs
Mood: Clear, professional, readable
```

#### Small Text
```
Size: 0.875rem (14px)
Weight: 400 (Regular)
Line Height: 1.6
Color: Muted
Usage: Captions, metadata, secondary info
Mood: Subtle, supporting
```

#### Tiny Text
```
Size: 0.8rem (13px)
Weight: 600 (Semibold)
Line Height: 1.5
Color: Subtle
Usage: Tags, badges, labels
Mood: Minimal, refined
```

### Font Weights
- **400**: Regular body text
- **500**: Medium emphasis
- **600**: Strong emphasis, badges
- **700**: Headings, bold text

---

## 📐 Spacing System

### Padding Scale
```
xs:  0.25rem (4px)   - Minimal spacing
sm:  0.5rem  (8px)   - Small gaps
md:  1rem    (16px)  - Standard padding
lg:  1.5rem  (24px)  - Card padding
xl:  2rem    (32px)  - Large padding
2xl: 2.5rem  (40px)  - Section padding
3xl: 3rem    (48px)  - Large section padding
```

### Margin Scale
Same as padding scale. Use consistently throughout.

### Gap Scale (Flex/Grid)
```
sm:  0.5rem  (8px)   - Tight spacing
md:  1rem    (16px)  - Standard gap
lg:  1.5rem  (24px)  - Generous gap
xl:  2rem    (32px)  - Large gap
```

### Section Spacing
```
Mobile:  1rem (16px) padding
Tablet:  1.5rem (24px) padding
Desktop: 2rem (32px) padding
```

---

## 🎭 Border Radius

### Subtle Radius
```
Value: 12px
Usage: Cards, buttons, inputs, badges
Mood: Modern, friendly, approachable
```

### Large Radius
```
Value: 16px
Usage: Large components, hero sections
Mood: Softer, more rounded
```

### Extra Large Radius
```
Value: 20px
Usage: Feature sections, large elements
Mood: Very soft, organic
```

### Full Radius
```
Value: 9999px
Usage: Badges, pills, circular elements
Mood: Pill-shaped, compact
```

---

## 🌟 Shadow System

### Soft Shadow
```
CSS: 0 1px 3px rgba(31, 35, 38, 0.06)
Usage: Default card shadow, subtle depth
Mood: Minimal, refined, subtle
```

### Medium Shadow
```
CSS: 0 4px 12px rgba(31, 35, 38, 0.1)
Usage: Hover states, elevated elements
Mood: More prominent, interactive
```

### Shadow Philosophy
- Use shadows sparingly
- Shadows should feel natural, not harsh
- Increase shadow on hover for interactivity
- Never use multiple layers of shadows

---

## 🎨 Component Styling

### Buttons

#### Primary Button
```
Background: Accent color
Text: White
Padding: 0.75rem 1.25rem
Border Radius: 12px
Border: None
Shadow: None (default), Medium (hover)
Transition: 0.2s ease
Hover: Darker accent + shadow
Active: Scale down (0.98)
```

**Example:**
```jsx
<button className="btn btn-primary">
  Explore Products
</button>
```

#### Ghost Button
```
Background: Transparent
Text: Primary text
Border: 1px solid border color
Padding: 0.75rem 1.25rem
Border Radius: 12px
Shadow: None
Transition: 0.2s ease
Hover: Light background + accent border
```

**Example:**
```jsx
<button className="btn btn-ghost">
  Learn More
</button>
```

#### Outline Button
```
Background: Transparent
Text: Accent color
Border: 1px solid accent
Padding: 0.75rem 1.25rem
Border Radius: 12px
Shadow: None
Transition: 0.2s ease
Hover: Light accent background
```

**Example:**
```jsx
<button className="btn btn-outline">
  Read Article
</button>
```

### Cards

```
Background: White
Border: 1px solid border color
Border Radius: 12px
Shadow: Soft (default), Medium (hover)
Padding: 1.5rem (default)
Transition: 0.2s ease
Hover: Enhanced shadow + accent border
```

**Example:**
```jsx
<div className="card card-pad-md">
  <img src="image.jpg" alt="Product" />
  <h3>Product Title</h3>
  <p>Description</p>
</div>
```

### Badges

```
Background: Light accent
Text: Dark accent
Border: 1px solid accent
Padding: 0.375rem 0.875rem
Border Radius: 9999px (pill)
Font Size: 0.8rem
Font Weight: 600
```

**Example:**
```jsx
<span className="badge">Food & Pantry</span>
```

### Inputs

```
Background: White
Border: 1px solid border color
Border Radius: 12px
Padding: 0.75rem 1rem
Font Size: 0.95rem
Transition: 0.2s ease
Focus: Accent border + light accent shadow
Placeholder: Subtle color
```

**Example:**
```jsx
<input
  type="email"
  placeholder="you@example.com"
  className="rounded-md border px-3 py-2 text-sm bg-surface border-border"
/>
```

---

## 📱 Responsive Design

### Mobile-First Approach
1. Design for mobile first
2. Add tablet enhancements with `md:` prefix
3. Add desktop enhancements with `lg:` prefix

### Key Responsive Changes

#### Typography
```
Mobile:  Smaller sizes (h1: 2rem)
Tablet:  Medium sizes (h1: 3rem)
Desktop: Larger sizes (h1: 5rem)
```

#### Spacing
```
Mobile:  Reduced (1rem padding)
Tablet:  Medium (1.5rem padding)
Desktop: Generous (2rem padding)
```

#### Layout
```
Mobile:  Single column
Tablet:  2-3 columns
Desktop: Full layout with sidebars
```

#### Navigation
```
Mobile:  Hamburger menu
Tablet:  Horizontal nav
Desktop: Full horizontal nav
```

---

## ✨ Interaction Design

### Hover States
```
Cards: Shadow enhancement + border color change
Links: Color change to accent + underline
Images: Scale up (1.05) + smooth transition
Buttons: Shadow enhancement + background darkening
```

### Focus States
```
Buttons: Visible outline or shadow
Inputs: Accent border + light shadow
Links: Visible outline or underline
```

### Active States
```
Buttons: Scale down (0.98)
Links: Darker color
Navigation: Accent background
```

### Transitions
```
Default: 0.2s ease (all properties)
Images: 0.3s ease (transform)
Colors: 0.2s ease (color changes)
Shadows: 0.2s ease (box-shadow)
```

---

## 🎯 Design Principles

### 1. Clarity
- Clear visual hierarchy
- Obvious interactive elements
- Readable typography
- Sufficient contrast

### 2. Simplicity
- Minimal visual noise
- Generous whitespace
- Focused content
- No unnecessary elements

### 3. Warmth
- Warm color palette
- Friendly typography
- Approachable design
- Human-centered

### 4. Trust
- Professional appearance
- Consistent design
- Clear communication
- Honest presentation

### 5. Accessibility
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- Color-blind friendly

### 6. Performance
- Fast load times
- Smooth interactions
- Optimized images
- Efficient CSS

---

## 🎨 Color Combinations

### Recommended Pairings

#### Text on Background
```
Text: #1F2326 on #FAF7F3 ✓ (Excellent contrast)
Text: #1F2326 on #FFFFFF ✓ (Excellent contrast)
Text: #585C5F on #FFFFFF ✓ (Good contrast)
```

#### Text on Accent
```
Text: #FFFFFF on #B86C4A ✓ (Excellent contrast)
Text: #FFFFFF on #4F7E7A ✓ (Excellent contrast)
```

#### Borders
```
Border: #E8E5E1 on #FFFFFF ✓ (Subtle, good)
Border: #E8E5E1 on #FAF7F3 ✓ (Subtle, good)
```

---

## 📸 Image Guidelines

### Product Images
- **Aspect Ratio**: 1:1 (square) or 4:3
- **Background**: White or light neutral
- **Style**: Clean, professional, well-lit
- **Size**: 800px × 800px minimum

### Blog Cover Images
- **Aspect Ratio**: 16:9 (landscape)
- **Background**: Varied, contextual
- **Style**: High-quality, engaging
- **Size**: 1200px × 675px minimum

### Icons
- **Style**: Minimalist, line-based
- **Color**: Match text color or accent
- **Size**: 16px, 20px, 24px, 32px
- **Stroke Width**: 1.5px - 2px

---

## 🔄 Theme Switching

### Terracotta Theme (Default)
```
Accent: #B86C4A (warm, earthy)
Dark: #994F37
Light: #F5E8E0
Best For: Organic, natural, warm brands
Mood: Cozy, trustworthy, premium
```

### Teal Theme
```
Accent: #4F7E7A (cool, modern)
Dark: #35615F
Light: #E8F1F0
Best For: Tech, modern, sophisticated brands
Mood: Professional, innovative, calm
```

---

## 📋 Design Checklist

- [ ] Use semantic color classes (`.text-text`, `.bg-surface`)
- [ ] Maintain proper heading hierarchy (h1 → h4)
- [ ] Use consistent spacing (padding/margin scale)
- [ ] Apply proper border radius (12px default)
- [ ] Include focus states on interactive elements
- [ ] Ensure color contrast (WCAG AA minimum)
- [ ] Use smooth transitions (0.2s ease)
- [ ] Optimize images for web
- [ ] Test on mobile devices
- [ ] Test with keyboard navigation
- [ ] Test with screen readers
- [ ] Verify link colors and underlines

---

## 🎓 Design Resources

### Color Tools
- Color Contrast Checker: webaim.org/resources/contrastchecker
- Color Palette Generator: coolors.co
- Color Blindness Simulator: color-blindness.com

### Typography Tools
- Font Pairing: fontpair.co
- Type Scale: typescale.com
- Line Height Calculator: www.thegoodfont.com

### Design Tools
- Figma: figma.com
- Adobe XD: adobe.com/products/xd
- Sketch: sketch.com

---

## 📞 Questions?

Refer to:
- `DESIGN_SYSTEM.md` for detailed specifications
- `UI_COMPONENTS.md` for component examples
- `globals.css` for implementation details

---

**Version**: 1.0  
**Last Updated**: 2024  
**Brand**: OROGUD - Premium Organic Lifestyle Products

---

## 🎉 Remember

> **Design is not just what it looks like and feels like. Design is how it works.**
> — Steve Jobs

This style guide ensures that OROGUD's design is not only beautiful but also functional, accessible, and aligned with the brand's values of trust, warmth, and quality.

Happy designing! 🎨
