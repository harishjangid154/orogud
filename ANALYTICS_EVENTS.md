# Google Analytics Events Reference

**GA ID:** `G-0F0579SN5C`

This document outlines all tracked user interactions and events in the OROGUD application.

---

## Automatic Events (No Code Required)

These events are automatically tracked by the GoogleAnalytics component without any additional implementation needed.

### 1. **Page View** (`page_view`)
- **Trigger:** When user navigates to a new page
- **Data Captured:**
  - `page_path` - Current URL path
  - `page_title` - Page title
  - `timestamp` - When the event occurred
- **Implementation:** Automatic via `usePathname()` hook

### 2. **Scroll Depth** (`scroll_depth`)
- **Trigger:** When user scrolls to 25%, 50%, 75%, or 100% of page
- **Data Captured:**
  - `scroll_percentage` - Scroll depth (25, 50, 75, or 100)
  - `page_title` - Current page title
  - `timestamp` - When the event occurred
- **Implementation:** Automatic scroll listener in GoogleAnalytics component

### 3. **Element Click** (`element_click`)
- **Trigger:** When user clicks on buttons, cards, or links
- **Data Captured:**
  - `element_type` - Type of element (button, card, link)
  - `element_name` - Text/label of the element
  - `element_id` - Optional ID of the element
  - `url` - For links, the target URL
  - `is_external` - For links, whether it's external
  - `timestamp` - When the event occurred
- **Implementation:** Automatic click listener in GoogleAnalytics component

---

## Manual Events (Requires Code Implementation)

These events need to be manually triggered in your components using the analytics utility functions.

### 4. **Product View** (`view_item`)
- **Purpose:** Track when user views a product detail page
- **Usage:**
```typescript
import { trackProductView } from '@/lib/analytics';

trackProductView(productId, productName, category);
```
- **Parameters:**
  - `productId` (string) - Product ID or slug
  - `productName` (string) - Product name
  - `category` (string, optional) - Product category
- **Example:**
```typescript
trackProductView('amla-candy-organic', 'Amla Candy Organic', 'Superfoods');
```
- **Implementation Location:** Product detail page (`app/products/[slug]/page.tsx`)

### 5. **Article View** (`view_article`)
- **Purpose:** Track when user views a blog/article detail page
- **Usage:**
```typescript
import { trackArticleView } from '@/lib/analytics';

trackArticleView(articleId, articleTitle, category);
```
- **Parameters:**
  - `articleId` (string) - Article ID or slug
  - `articleTitle` (string) - Article title
  - `category` (string, optional) - Article category
- **Example:**
```typescript
trackArticleView('amla-health-benefits', 'Health Benefits of Amla', 'Health Tips');
```
- **Implementation Location:** Blog detail page (`app/blogs/[title]/page.tsx`)

### 6. **Form Submission** (`form_submit`)
- **Purpose:** Track form submissions (newsletter, contact, etc.)
- **Usage:**
```typescript
import { trackFormSubmission } from '@/lib/analytics';

trackFormSubmission(formName, formData);
```
- **Parameters:**
  - `formName` (string) - Name of the form
  - `formData` (object, optional) - Non-sensitive form data
- **Example:**
```typescript
trackFormSubmission('newsletter_signup', { email_domain: 'gmail.com' });
```
- **Implementation Location:** Any form component

### 7. **Link Click** (`link_click`)
- **Purpose:** Track specific link clicks with custom data
- **Usage:**
```typescript
import { trackLinkClick } from '@/lib/analytics';

trackLinkClick(linkUrl, linkText, isExternal);
```
- **Parameters:**
  - `linkUrl` (string) - URL of the link
  - `linkText` (string) - Text of the link
  - `isExternal` (boolean, optional) - Whether link is external
- **Example:**
```typescript
trackLinkClick('https://instagram.com/orogud', 'Follow on Instagram', true);
```
- **Implementation Location:** Social links, external references

### 8. **Custom Event** (`custom_event`)
- **Purpose:** Track any custom user interaction
- **Usage:**
```typescript
import { trackCustomEvent } from '@/lib/analytics';

trackCustomEvent(eventName, eventData);
```
- **Parameters:**
  - `eventName` (string) - Name of the event
  - `eventData` (object, optional) - Event-specific data
- **Example:**
```typescript
trackCustomEvent('add_to_cart', { product_id: 'amla-candy', quantity: 2 });
```
- **Implementation Location:** Any custom interaction

---

## How to Track Card Clicks

To enable automatic tracking of card clicks, add these attributes to your card elements:

```jsx
<div data-card data-card-name="Product Card" data-card-id="amla-candy-organic">
  {/* Card content */}
</div>
```

- `data-card` - Marks the element as a trackable card
- `data-card-name` - Display name for the card
- `data-card-id` - Unique identifier for the card

---

## Implementation Checklist

- [x] Google Analytics initialization
- [x] Page view tracking
- [x] Scroll depth tracking
- [x] Button click tracking
- [x] Card click tracking
- [x] Link click tracking
- [x] Product view tracking (ProductCard, ProductCarousel, ProductFilter)
- [x] Form submission tracking (Footer newsletter)
- [x] Header navigation tracking (desktop & mobile)
- [x] Footer links tracking (all sections)
- [x] Product carousel tracking (scroll buttons, view all)
- [x] Share product button tracking (copy, Twitter, Facebook)
- [x] Category filter tracking (all categories, clear filters)
- [ ] Article view tracking (needs implementation in blog pages)

---

## Viewing Events in Google Analytics

1. Go to [Google Analytics Dashboard](https://analytics.google.com)
2. Select the OROGUD property
3. Navigate to **Reports** → **Realtime** to see live events
4. Or go to **Reports** → **Events** to see historical data

---

## Best Practices

1. **Always check for window object** - All tracking functions check `typeof window !== 'undefined'`
2. **Non-sensitive data only** - Never track passwords, credit cards, or personal information
3. **Use meaningful names** - Use clear, descriptive names for events and elements
4. **Add IDs to trackable elements** - Makes it easier to identify elements in analytics
5. **Test before deploying** - Use Google Analytics Real-time reports to verify tracking

---

## Troubleshooting

**Events not showing up?**
- Check that Google Analytics script is loaded (check Network tab in DevTools)
- Verify GA ID is correct: `G-0F0579SN5C`
- Check browser console for errors
- Ensure `window.gtag` is defined before calling tracking functions

**Too many events?**
- Consider adding event filters in Google Analytics
- Use event parameters to categorize events
- Implement sampling for high-traffic pages

---

## Tracked Components & Events

### Header Component
- **Logo click** - `header-logo`
- **Desktop nav links** - `nav-{name}` (Home, Products, Categories, Blogs, About)
- **Mobile menu toggle** - `mobile-menu-toggle`
- **Mobile nav links** - `mobile-nav-{name}`

### Footer Component
- **Logo click** - `footer-logo`
- **Shop links** - `footer-all-products`, `footer-health-wellness`, `footer-food-pantry`, `footer-skin-care`, `footer-tea-beverages`, `footer-view-all-categories`
- **Resources links** - `footer-blog`, `footer-about-us`, `footer-shipping-returns`, `footer-faq`
- **Newsletter subscribe** - `newsletter-subscribe` (form submission with email domain)
- **Email link** - `footer-email`

### Product Components
- **ProductCard** - Product view tracking on all links, card click tracking with data attributes
- **ProductCarousel** - Scroll buttons, view all link, product view tracking on all product links
- **ProductFilter** - Category filter clicks, clear filter click
- **ShareProductButton** - Copy link, Twitter share, Facebook share

### Automatic Tracking (No Code Required)
- **Page views** - Every route change
- **Scroll depth** - 25%, 50%, 75%, 100% scroll milestones
- **All button clicks** - Automatically tracked by GoogleAnalytics component
- **All link clicks** - Automatically tracked with URL and external flag
- **Card clicks** - Elements with `data-card` attribute

---

## Files Modified/Created

- `components/GoogleAnalytics.tsx` - Main GA component with automatic tracking
- `lib/analytics.ts` - Analytics utility functions
- `types/window.d.ts` - TypeScript type definitions for window.gtag and window.dataLayer
- `app/layout.tsx` - Added GoogleAnalytics component
- `components/Header/index.tsx` - Added tracking to nav links and menu toggle
- `components/Footer/index.tsx` - Added tracking to all footer links and newsletter form
- `components/ProductCard.tsx` - Added product view tracking and card attributes
- `components/ProductCarousel.tsx` - Added product view and carousel navigation tracking
- `components/ProductFilter.tsx` - Added category filter tracking
- `components/ShareProductButton.tsx` - Added social share tracking
