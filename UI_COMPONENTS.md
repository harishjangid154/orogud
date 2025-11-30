# OROGUD UI Components Reference

## Quick Component Examples

### 1. Primary Button
```jsx
<button className="btn btn-primary">
  Explore Products
</button>

<button className="btn btn-primary btn-sm">Small Button</button>
<button className="btn btn-primary btn-lg">Large Button</button>
```

**Styling:**
- Background: Accent color
- Text: White
- Padding: 0.75rem 1.25rem (default)
- Border radius: 12px
- Hover: Darker accent + shadow
- Active: Scale down (0.98)

---

### 2. Ghost Button
```jsx
<button className="btn btn-ghost">
  Secondary Action
</button>
```

**Styling:**
- Background: Transparent
- Border: 1px solid border color
- Text: Primary text color
- Hover: Light background + accent border

---

### 3. Outline Button
```jsx
<button className="btn btn-outline">
  Tertiary Action
</button>
```

**Styling:**
- Background: Transparent
- Border: 1px solid accent
- Text: Accent color
- Hover: Light accent background

---

### 4. Badge
```jsx
<span className="badge">Food & Pantry</span>
<span className="badge">Wellness</span>
<span className="badge">Home & Living</span>
```

**Styling:**
- Background: Light accent (--accent-100)
- Text: Dark accent (--accent-600)
- Border: 1px solid accent
- Border radius: 9999px (pill shape)
- Font size: 0.8rem
- Font weight: 600

---

### 5. Card
```jsx
<div className="card card-pad-md">
  <img src="product.jpg" alt="Product" className="w-full h-56 object-cover rounded-lg mb-4" />
  <h3 className="text-lg font-semibold text-text mb-2">Product Title</h3>
  <p className="text-muted text-sm mb-4">Product description...</p>
  <div className="flex items-center justify-between pt-4 border-t border-border">
    <span className="badge">Category</span>
    <button className="btn btn-primary btn-sm">View</button>
  </div>
</div>
```

**Styling:**
- Background: White (--surface)
- Border: 1px solid border color
- Border radius: 12px
- Shadow: Soft (0 1px 3px)
- Hover: Enhanced shadow + accent border
- Padding options: card-pad-sm (1rem), card-pad-md (1.5rem), card-pad-lg (2rem)

---

### 6. Product Grid
```jsx
<div className="product-grid">
  {products.map((product) => (
    <article key={product.slug} className="card card-pad-md">
      {/* Card content */}
    </article>
  ))}
</div>
```

**Responsive:**
- Desktop: 280px min-width columns, 1.5rem gap
- Mobile: 240px min-width columns, 1rem gap
- Auto-fill layout

---

### 7. Header
```jsx
<header className="bg-surface border-b border-border sticky top-0 z-40 shadow-soft">
  <div className="container-max flex items-center gap-4 h-16 px-4 md:px-8">
    {/* Logo */}
    {/* Desktop Nav */}
    {/* Theme Toggle */}
    {/* Mobile Menu */}
  </div>
</header>
```

**Features:**
- Sticky positioning
- White background with subtle border
- Soft shadow
- 16px height (h-16)
- Responsive padding
- Theme toggle button
- Mobile menu support

---

### 8. Footer
```jsx
<footer className="bg-surface-2 border-t border-border mt-16">
  <div className="container-max py-12 px-4 md:px-8">
    <div className="grid gap-8 grid-cols-1 md:grid-cols-5 mb-8">
      {/* Brand section (2 columns) */}
      {/* Shop links */}
      {/* Resources */}
      {/* Newsletter */}
    </div>
    <div className="border-t border-border pt-8">
      {/* Copyright + contact */}
    </div>
  </div>
</footer>
```

**Features:**
- Light beige background (--surface-2)
- Responsive grid (1 column mobile, 5 columns desktop)
- Newsletter signup form
- Multiple link sections
- Copyright info

---

### 9. Form Input
```jsx
<input
  type="email"
  placeholder="you@example.com"
  className="rounded-md border px-3 py-2 text-sm bg-surface border-border"
/>
```

**Styling:**
- Background: White (--surface)
- Border: 1px solid border color
- Border radius: 12px
- Padding: 0.75rem 1rem
- Focus: Accent border + light accent shadow
- Placeholder: Subtle color

---

### 10. Hero Section
```jsx
<section className="container-max px-4 md:px-8 py-16 md:py-24">
  <div className="max-w-2xl">
    <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
      Headline
    </h1>
    <p className="lead text-lg mb-8">
      Subheading text...
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="btn btn-primary btn-lg">Primary CTA</button>
      <button className="btn btn-outline btn-lg">Secondary CTA</button>
    </div>
  </div>
</section>
```

**Features:**
- Large headline (4xl-5xl)
- Lead text (1.125rem)
- Two CTA buttons
- Responsive layout
- Generous padding

---

### 11. Breadcrumb Navigation
```jsx
<div className="flex items-center gap-2 text-sm text-muted">
  <Link href="/products" className="hover:text-accent transition-colors">
    Products
  </Link>
  <span>/</span>
  <span className="text-text font-medium">Product Name</span>
</div>
```

**Styling:**
- Small text (0.875rem)
- Muted color
- Links: Hover to accent
- Smooth transitions

---

### 12. Prose (Article Content)
```jsx
<section className="prose max-w-none">
  {/* HTML content from markdown conversion */}
</section>
```

**Includes Styling For:**
- Headings (h1-h4)
- Paragraphs
- Lists (ul, ol)
- Links
- Proper spacing and line-height

---

### 13. Price Highlight Box
```jsx
<div className="bg-accent-light rounded-lg p-6 flex items-center justify-between">
  <div>
    <p className="text-sm text-muted mb-1">Price</p>
    <div className="text-3xl font-bold text-accent">₹1,299</div>
  </div>
  <button className="btn btn-primary btn-lg">Add to cart</button>
</div>
```

**Features:**
- Light accent background
- Rounded corners
- Price display
- CTA button
- Flexbox layout

---

### 14. Text Utilities
```jsx
{/* Primary text */}
<p className="text-text">Primary text</p>

{/* Secondary text */}
<p className="text-muted">Secondary text</p>

{/* Tertiary text */}
<p className="text-subtle">Tertiary text</p>

{/* Accent text */}
<p className="text-accent">Accent text</p>

{/* Lead text */}
<p className="lead">Lead text for introductions</p>
```

---

### 15. Responsive Grid Layout
```jsx
<div className="grid gap-8 md:grid-cols-3">
  <div className="md:col-span-2">
    {/* Main content - 2 columns on desktop */}
  </div>
  <aside className="md:col-span-1">
    {/* Sidebar - 1 column on desktop */}
  </aside>
</div>
```

**Behavior:**
- Mobile: Single column
- Desktop: 3-column grid with 8px gap
- Main content: 2 columns
- Sidebar: 1 column

---

## Color Palette Quick Reference

### Neutrals
| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Background | `--bg` | #FAF7F3 | Page background |
| Surface | `--surface` | #FFFFFF | Card/section background |
| Surface 2 | `--surface-2` | #F6F3EE | Alternate surface |
| Text | `--text` | #1F2326 | Primary text |
| Muted | `--muted` | #585C5F | Secondary text |
| Subtle | `--subtle` | #8C8F92 | Tertiary text |
| Border | `--border` | #E8E5E1 | Borders |

### Accents (Theme-Dependent)
| Color | Terracotta | Teal |
|-------|-----------|------|
| Accent | #B86C4A | #4F7E7A |
| Accent 600 | #994F37 | #35615F |
| Accent 100 | #F5E8E0 | #E8F1F0 |

### Status Colors
| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Success | `--success` | #2E7D4B | Success states |
| Warning | `--warning` | #C0844B | Warning states |
| Danger | `--danger` | #B44A4A | Error states |

---

## Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| h1 | 2rem (32px) | 700 | 1.2 |
| h2 | 1.5rem (24px) | 700 | 1.3 |
| h3 | 1.25rem (20px) | 700 | 1.4 |
| h4 | 1.1rem (18px) | 700 | 1.4 |
| Lead | 1.125rem (18px) | 400 | 1.6 |
| Body | 1rem (16px) | 400 | 1.7 |
| Small | 0.875rem (14px) | 400 | 1.6 |
| Tiny | 0.8rem (13px) | 600 | 1.5 |

---

## Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| xs | 0.25rem | Minimal spacing |
| sm | 0.5rem | Small gaps |
| md | 1rem | Standard padding |
| lg | 1.5rem | Card padding |
| xl | 2rem | Large padding |
| 2xl | 2.5rem | Section padding |
| 3xl | 3rem | Large section padding |

---

## Border Radius

| Size | Value | Usage |
|------|-------|-------|
| Default | 12px | Cards, buttons, inputs |
| Large | 16px | Large components |
| Extra Large | 20px | Hero sections |
| Full | 9999px | Badges, pills |

---

## Shadow Scale

| Level | CSS | Usage |
|-------|-----|-------|
| Soft | 0 1px 3px rgba(31, 35, 38, 0.06) | Default cards |
| Medium | 0 4px 12px rgba(31, 35, 38, 0.1) | Hover states |

---

## Responsive Breakpoints

| Device | Width | Prefix |
|--------|-------|--------|
| Mobile | < 768px | (none) |
| Tablet | 768px - 1024px | `md:` |
| Desktop | > 1024px | `md:` |

---

## Animation/Transition Defaults

```css
/* Standard transition */
transition: all 0.2s ease;

/* Color transition */
transition-colors;

/* Transform transition */
transition-transform duration-300;

/* Hover scale */
hover:scale-105;

/* Button active */
active:scale-0.98;
```

---

## Accessibility Checklist

- [ ] All images have `alt` text
- [ ] Links have visible focus states
- [ ] Color contrast meets WCAG AA standards
- [ ] Buttons have `aria-label` or visible text
- [ ] Form inputs have associated labels
- [ ] Semantic HTML used throughout
- [ ] No keyboard traps
- [ ] Focus order is logical
- [ ] Interactive elements are at least 44px × 44px
- [ ] Text is resizable without loss of functionality

---

## Performance Tips

1. **CSS Variables** - Use for theme switching (no JS repaints)
2. **Transitions** - Use CSS transitions, not animations
3. **Shadows** - Minimize on large elements
4. **Images** - Lazy load and optimize
5. **Grid** - Use auto-fill for responsive layouts
6. **Flexbox** - Prefer for component layouts
7. **Hover States** - Use `:hover` pseudo-class
8. **Focus States** - Use `:focus` pseudo-class

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

**Last Updated:** 2024  
**Version:** 1.0  
**Brand:** OROGUD
