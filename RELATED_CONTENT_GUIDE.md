# Related Content Implementation Guide

## Overview
This guide explains the new related products and blogs feature that has been added to the OROGUD website. The system automatically generates related content based on tag similarity between products and blogs.

## What's New

### 1. Related Products on Product Details Page
- Each product now displays up to 4 related products based on tag similarity
- Related products are shown in the right sidebar below the product description
- Links are interactive with hover effects for better UX

### 2. Related Blogs on Product Details Page
- Each product displays up to 3 related blog articles
- Helps drive engagement by connecting products to educational content
- Positioned below related products in the sidebar

### 3. Redesigned Blog Details Page
- **Stretched Hero Image**: Full-width cover image at the top (400px on mobile, 500px on desktop)
- **3-Column Layout**: 
  - Main content takes 2 columns
  - Sidebar with related content takes 1 column
  - Sidebar is sticky for easy navigation while reading
- **Related Articles**: Shows up to 3 related blog posts
- **Related Products**: Shows up to 4 related products with a "View All Products" button
- **Newsletter CTA**: Call-to-action box for user engagement
- **Better Typography**: Improved spacing and readability

## How It Works

### Script: `generate-related-content.js`

The script uses **tag-based similarity** to find related content:

1. **Loads all products and blogs** from `data/products/` and `data/blogs/`
2. **Calculates similarity** between items using Jaccard similarity on tags
3. **Generates relationships** for each product and blog
4. **Updates JSON files** with `relatedProducts` and `relatedBlogs` arrays

#### Similarity Algorithm
```
Similarity = (Common Tags) / (Total Unique Tags)
```

Example:
- Product A tags: `["ayurveda", "organic", "skin-care", "natural"]`
- Product B tags: `["ayurveda", "skin-care", "pitta"]`
- Common: 2 tags (`ayurveda`, `skin-care`)
- Total unique: 5 tags
- Similarity: 2/5 = 0.4 (40%)

### Running the Script

```bash
cd scripts
node generate-related-content.js
```

**Output:**
- Updates all 100 products with related products and blogs
- Updates all 100 blogs with related blogs and products
- Console shows progress with checkmarks

### Data Structure

After running the script, each product/blog JSON file includes:

```json
{
  "title": "Product/Blog Title",
  "tags": ["tag1", "tag2", "tag3"],
  "relatedProducts": [
    {
      "slug": "related-product-slug",
      "title": "Related Product Title"
    }
  ],
  "relatedBlogs": [
    {
      "slug": "related-blog-slug",
      "title": "Related Blog Title"
    }
  ]
}
```

## UI Components

### Product Details Page
- **Related Products Section**: Grid of linked product cards with hover effects
- **Related Blogs Section**: Grid of linked blog cards with hover effects
- Both sections are conditionally rendered (only show if related content exists)

### Blog Details Page
- **Hero Image**: Full-width cover image
- **Sticky Sidebar**: 
  - Related Articles (top)
  - Related Products (middle)
  - Newsletter CTA (bottom)
- **Responsive**: Sidebar moves below content on mobile/tablet

## Customization

### Adjust Number of Related Items

Edit `scripts/generate-related-content.js`:

```javascript
// Change these numbers (currently 4 for products, 3 for blogs)
data.relatedProducts = getRelatedItems(product.slug, product.tags, products, 4);
data.relatedBlogs = getRelatedItems(product.slug, product.tags, blogs, 3);
```

### Adjust Similarity Threshold

To only show items with higher similarity, modify the `getRelatedItems` function:

```javascript
function getRelatedItems(currentSlug, currentTags, allItems, limit = 3) {
  return allItems
    .filter(item => item.slug !== currentSlug && item.similarity > 0.2) // Add threshold
    .map(item => ({...}))
    // ...
}
```

## Re-running the Script

If you add new products or blogs, simply run the script again:

```bash
node generate-related-content.js
```

The script will:
- Recalculate all relationships
- Update all JSON files with fresh data
- Show progress for each item

## Performance Notes

- **Generation Time**: ~1-2 seconds for 100 products + 100 blogs
- **File Size**: Each product/blog adds ~200-300 bytes for related content
- **Runtime**: No performance impact (data is pre-generated)

## Future Enhancements

Possible improvements:
1. **Category-based filtering**: Prioritize same-category products
2. **Manual overrides**: Allow editors to manually set related items
3. **Trending items**: Show popular products/blogs first
4. **User behavior**: Track clicks to improve recommendations
5. **AI-based**: Use embeddings for semantic similarity

## Troubleshooting

### Script doesn't find files
- Ensure `data/products/` and `data/blogs/` directories exist
- Check that JSON files are properly formatted

### Related content not showing
- Verify products/blogs have `tags` array with at least 1 tag
- Run the script again to regenerate relationships
- Check browser console for errors

### Incorrect related items
- This is expected if items have very different tags
- Adjust the number of results or similarity threshold
- Consider adding more descriptive tags to products/blogs

## Files Modified

1. **`scripts/generate-related-content.js`** (NEW)
   - Script to generate related content

2. **`app/products/[slug]/page.tsx`**
   - Added related products and blogs sections
   - Updated TypeScript types

3. **`app/blogs/[title]/page.tsx`**
   - Redesigned layout with hero image
   - Added sticky sidebar with related content
   - Updated TypeScript types

4. **All product JSON files** (Updated)
   - Added `relatedProducts` array
   - Added `relatedBlogs` array

5. **All blog JSON files** (Updated)
   - Added `relatedBlogs` array
   - Added `relatedProducts` array
