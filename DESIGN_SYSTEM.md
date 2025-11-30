# OROGUD Design System & UI/UX Guide

## 🎨 Brand Identity

**OROGUD** is a premium organic lifestyle e-commerce brand with a warm, minimalist aesthetic inspired by brands like Aesop, Everlane, Pangaia, and Neemli Organics.

### Visual Philosophy
- Modern, warm minimalism
- Premium organic lifestyle feel
- Neutral, soft, calm design
- No neon, no saturated colors, no crazy animations
- Clean typography, soft shadows, rounded corners
- Easy on the eyes, designed for trust and clarity

---

## 🎭 Color System

### Core Neutrals (Always Same)
```css
--bg: #FAF7F3;           /* Warm off-white background */
--surface: #FFFFFF;      /* Pure white surfaces */
--surface-2: #F6F3EE;    /* Light beige alternate surface */

--text: #1F2326;         /* Deep charcoal text */
--muted: #585C5F;        /* Medium gray for secondary text */
--subtle: #8C8F92;       /* Light gray for tertiary text */

--border: #E8E5E1;       /* Soft warm border */
--shadow: rgba(31, 35, 38, 0.06);  /* Subtle shadow */
--shadow-md: rgba(31, 35, 38, 0.1); /* Medium shadow */

--wood: #8A6B4A;         /* Woody tone */
--beige: #CFC1AE;        /* Beige accent */
--cream: #F3E9D8;        /* Cream tone */
--brown-deep: #4A3B2E;   /* Deep brown */

--success: #2E7D4B;      /* Success green */
--warning: #C0844B;      /* Warning orange */
--danger: #B44A4A;       /* Danger red */

--radius: 12px;          /* Standard border radius */
--radius-lg: 16px;       /* Large border radius */
--radius-xl: 20px;       /* Extra large border radius */
```

### Theme-Switchable Accents

#### Terracotta Theme (Default)
```css
--accent: #B86C4A;       /* Warm terracotta */
--accent-600: #994F37;   /* Darker terracotta */
--accent-100: #F5E8E0;   /* Light terracotta background */
--accent-contrast: #FFFFFF;
```

#### Teal Theme
```css
--accent: #4F7E7A;       /* Muted teal */
--accent-600: #35615F;   /* Darker teal */
--accent-100: #E8F1F0;   /* Light teal background */
--accent-contrast: #FFFFFF;
```

---

## 🧱 Component Library

### Semantic Classes

#### Backgrounds
- `.bg-primary` - Primary background (warm off-white)
- `.bg-surface` - Surface background (white)
- `.bg-surface-2` - Alternate surface (light beige)
- `.bg-accent` - Accent background
- `.bg-accent-light` - Light accent background

#### Text Colors
- `.text-text` - Primary text color
- `.text-muted` - Secondary text color
- `.text-subtle` - Tertiary text color
- `.text-accent` - Accent text color
- `.text-accent-600` - Darker accent text

#### Borders & Shadows
- `.border-border` - Standard border color
- `.border-subtle` - Subtle border color
- `.shadow-soft` - Soft shadow (0 1px 3px)
- `.shadow-md` - Medium shadow (0 4px 12px)

### Cards
```html
<div class="card">
  <!-- Content -->
</div>

<!-- With padding options -->
<div class="card card-pad-sm">  <!-- 1rem padding -->
<div class="card card-pad-md">  <!-- 1.5rem padding -->
<div class="card card-pad-lg">  <!-- 2rem padding -->
```

**Features:**
- White background with subtle border
- Soft shadow that enhances on hover
- Smooth transitions
- Rounded corners (12px default)

### Buttons

#### Primary Button
```html
<button class="btn btn-primary">Action</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

**Styles:**
- Accent background color
- White text
- Hover: darker accent with enhanced shadow
- Active: slight scale down (0.98)

#### Ghost Button
```html
<button class="btn btn-ghost">Secondary</button>
```

**Styles:**
- Transparent background
- Border with subtle color
- Hover: light background + accent border

#### Outline Button
```html
<button class="btn btn-outline">Tertiary</button>
```

**Styles:**
- Transparent background
- Accent border and text
- Hover: light accent background

### Badges
```html
<span class="badge">Category</span>
```

**Features:**
- Pill-shaped (border-radius: 9999px)
- Light accent background
- Darker accent text
- Accent border
- Small font (0.8rem)
- Font weight: 600

### Typography

#### Lead Text
```html
<p class="lead">Larger, secondary text for introductions</p>
```
- Font size: 1.125rem
- Line height: 1.6
- Color: muted
- Font weight: 400

#### Prose (Article Content)
```html
<section class="prose">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <p>Paragraph text...</p>
  <ul>
    <li>List item</li>
  </ul>
</section>
```

**Features:**
- Proper heading hierarchy (h1-h4)
- Generous margins
- Links are accent-colored with underline
- Lists have proper indentation
- All text uses CSS variables for colors

---

## 📐 Layout System

### Container
```html
<div class="container-max">
  <!-- Max width: 1200px, centered, full width on mobile -->
</div>
```

### Grid
```html
<div class="product-grid">
  <!-- Auto-fill grid with 280px minimum columns -->
  <!-- Responsive: 240px on mobile -->
</div>
```

**Responsive Behavior:**
- Desktop: 280px minimum column width
- Mobile: 240px minimum column width
- Gap: 1.5rem (desktop), 1rem (mobile)

---

## 🖥️ Page Layouts

### Home Page
1. **Hero Section**
   - Large headline (4xl-5xl)
   - Lead text
   - Two CTA buttons (primary + outline)
   - Warm background

2. **Latest Products Section**
   - Grid of product cards
   - Each card: image, title, excerpt, category badge, price, CTA button
   - "View all" link

3. **Latest Articles Section**
   - Grid of blog cards
   - Each card: cover image, title, author, date, excerpt, tags, CTA button
   - "View all" link

### Products Page
1. **Header Section**
   - Large headline
   - Description text
   - Warm background

2. **Products Grid**
   - Product count indicator
   - Responsive grid of product cards
   - Hover effects on cards

### Product Detail Page
1. **Breadcrumb Navigation**
   - Products / Product Name

2. **Main Content**
   - Large product image
   - Category badge + date
   - Large headline
   - Excerpt
   - Price highlight box with CTA button
   - Full description (prose)

3. **Sidebar**
   - Product details (SKU, category)
   - Tags
   - Explore more section with link to all products

### Blogs Page
1. **Header Section**
   - Large headline
   - Description text
   - Warm background

2. **Blog Grid**
   - Article count indicator
   - Responsive grid of blog cards
   - Hover effects on cards

### Blog Detail Page
1. **Breadcrumb Navigation**
   - Blog / Article Title

2. **Article Content**
   - Cover image
   - Large headline
   - Author + date + tags
   - Excerpt
   - Full article content (prose)
   - Share buttons + back link

---

## 🧭 Navigation

### Header
- **Sticky positioning** (top: 0, z-index: 40)
- **Logo on left** with brand name (hidden on mobile)
- **Desktop navigation** (hidden on mobile)
  - Home, Products, Categories, Blogs, About
  - Active state: accent color + bold
  - Hover: text color change
- **Theme toggle button** (sun/moon icon)
- **Mobile menu toggle** (hamburger icon)
- **Mobile menu** (slides down when open)
  - Full-width navigation
  - Active state: accent background
  - Smooth transitions

### Footer
- **Background:** Light beige (surface-2)
- **5-column grid** (responsive to 1 column on mobile)
  - Brand + description (2 columns)
  - Shop links
  - Resources links
  - Newsletter signup
- **Bottom divider** with copyright + contact info

---

## ✨ Interactive Elements

### Hover States
- **Cards:** Shadow enhancement, border color change to accent
- **Links:** Color change to accent, underline
- **Images:** Scale up (1.05) with smooth transition
- **Buttons:** Shadow enhancement, background darkening

### Transitions
- All interactive elements: `transition: all 0.2s ease`
- Image hover: `transition-transform duration-300`
- Color changes: `transition-colors`

### Focus States
- **Inputs:** 
  - Accent border
  - Light accent background shadow
  - Outline: none (using box-shadow instead)

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile-First Approach
- Base styles for mobile
- `md:` prefix for tablet/desktop
- `sm:` prefix for small enhancements

### Key Responsive Changes
- **Header:** Logo text hidden on mobile, full width on desktop
- **Navigation:** Mobile menu on small screens, horizontal nav on desktop
- **Grid:** Single column on mobile, multi-column on desktop
- **Padding:** Reduced on mobile (4px), increased on desktop (8px)
- **Typography:** Smaller on mobile, larger on desktop

---

## 🎯 Best Practices

### Color Usage
1. Always use CSS variables (e.g., `color: var(--text)`)
2. Never hardcode colors in components
3. Use semantic class names (`.text-text`, `.bg-surface`)
4. Respect theme switching (terracotta ↔ teal)

### Typography
1. Use semantic HTML (`<h1>`, `<h2>`, `<p>`, etc.)
2. Use `.lead` for introductory text
3. Use `.prose` for article content
4. Maintain proper heading hierarchy

### Spacing
1. Use consistent padding/margin values
2. Use card padding classes (`.card-pad-sm/md/lg`)
3. Use gap utilities for flex/grid layouts
4. Maintain generous whitespace

### Accessibility
1. Use semantic HTML
2. Include `aria-labels` on interactive elements
3. Ensure color contrast meets WCAG standards
4. Use `role` attributes where needed
5. Include `alt` text on all images

### Performance
1. Use CSS variables for theme switching (no JavaScript repaints)
2. Use CSS transitions (not animations) for subtle effects
3. Lazy load images when possible
4. Minimize shadow usage on large elements

---

## 🔄 Theme Switching

The theme is controlled by the `data-theme` attribute on the `<html>` element:

```html
<html data-theme="terracotta">  <!-- or "teal" -->
```

All accent colors automatically update via CSS variables. No component changes needed.

**Header Component** includes a theme toggle button that switches between terracotta and teal.

---

## 📦 File Structure

```
app/
├── globals.css          # Design system + semantic classes
├── layout.tsx           # Root layout with Header/Footer
├── page.tsx             # Home page
├── products/
│   ├── page.tsx         # Products listing
│   └── [slug]/
│       └── page.tsx     # Product detail
├── blogs/
│   ├── page.tsx         # Blog listing
│   └── [title]/
│       └── page.tsx     # Blog detail
components/
├── Header/
│   └── index.tsx        # Sticky header with nav + theme toggle
└── Footer/
    └── index.tsx        # Footer with links + newsletter
```

---

## 🚀 Implementation Notes

### Key Files Modified
1. **globals.css** - Complete design system with semantic classes
2. **Header/index.tsx** - Enhanced with theme toggle, sticky positioning
3. **Footer/index.tsx** - Improved layout and styling
4. **page.tsx** (home) - Hero section + featured products/blogs
5. **products/page.tsx** - Full-width layout with header
6. **products/[slug]/page.tsx** - Product detail with sidebar
7. **blogs/page.tsx** - Blog listing with header
8. **blogs/[title]/page.tsx** - Blog detail with breadcrumb
9. **layout.tsx** - Simplified body structure

### CSS Variables in Use
All components use CSS variables for:
- Colors (text, backgrounds, borders, accents)
- Spacing (radius, container width)
- Shadows (soft, medium)

This allows for:
- Easy theme switching (terracotta ↔ teal)
- Consistent design system
- Maintainable code
- Future color updates without component changes

---

## 💡 Design Principles

1. **Trust & Clarity** - Clean, minimal design builds confidence
2. **Warmth** - Neutral tones with warm accents feel inviting
3. **Hierarchy** - Clear visual hierarchy guides user attention
4. **Consistency** - Repeating patterns create familiarity
5. **Breathing Room** - Generous spacing reduces cognitive load
6. **Premium Feel** - Soft shadows, rounded corners, quality typography
7. **Accessibility** - Inclusive design for all users
8. **Performance** - Fast, smooth interactions

---

## 🎨 Example Component Usage

### Product Card
```jsx
<article className="card card-pad-md hover:shadow-md transition-all">
  <Link href={`/products/${slug}`} className="block overflow-hidden rounded-lg mb-4">
    <img src={image} alt={title} className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
  </Link>
  
  <div>
    <h3 className="text-lg font-semibold text-text mb-2">
      <Link href={`/products/${slug}`} className="hover:text-accent transition-colors">
        {title}
      </Link>
    </h3>
    <p className="text-muted text-sm mb-4 line-clamp-2">{excerpt}</p>
    
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div className="flex items-center gap-2">
        <span className="badge">{category}</span>
        <div className="text-sm font-semibold text-accent">₹{price}</div>
      </div>
      <Link href={`/products/${slug}`} className="btn btn-primary btn-sm">View</Link>
    </div>
  </div>
</article>
```

---

## 📝 Notes for Future Development

1. **Search Functionality** - Add search bar to header with product filtering
2. **Filtering** - Implement category/tag filters on products and blogs pages
3. **Cart System** - Connect "Add to cart" buttons to shopping cart
4. **User Accounts** - Add login/signup functionality
5. **Analytics** - Track user behavior and conversions
6. **SEO** - Ensure all pages have proper meta tags
7. **Performance** - Optimize images and implement lazy loading
8. **Mobile App** - Consider React Native version for iOS/Android

---

**Design System Version:** 1.0  
**Last Updated:** 2024  
**Brand:** OROGUD - Premium Organic Lifestyle Products
