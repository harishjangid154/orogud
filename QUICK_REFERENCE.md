# Quick Reference: Related Content Feature

## 🚀 Quick Start

### Generate Related Content
```bash
cd scripts
node generate-related-content.js
```

That's it! The script will:
- Scan all products and blogs
- Calculate relationships based on tags
- Update all JSON files
- Show progress in console

---

## 📍 Where to See Changes

### Product Details Page
**URL:** `/products/{product-slug}`

**New Sections:**
- "Related Products" - Shows 4 related products
- "Related Articles" - Shows 3 related blog posts

**Location:** Below the product description tabs

### Blog Details Page
**URL:** `/blogs/{blog-slug}`

**New Layout:**
- Full-width hero image at top
- 3-column grid layout
- Sidebar with:
  - Related Articles (3 items)
  - Related Products (4 items)
  - Newsletter CTA

---

## 🔄 How It Works

1. **Script reads** all product and blog JSON files
2. **Calculates similarity** based on shared tags
3. **Ranks items** by similarity score
4. **Selects top items** (4 products, 3 blogs)
5. **Updates JSON files** with relationship data

### Example
```
Product A tags: [ayurveda, organic, skin-care]
Product B tags: [ayurveda, skin-care, natural]

Common tags: 2 (ayurveda, skin-care)
Total unique: 4 (ayurveda, organic, skin-care, natural)
Similarity: 2/4 = 50%
```

---

## 📊 Data Added to Each Item

### Products
```json
{
  "relatedProducts": [
    {"slug": "...", "title": "..."},
    {"slug": "...", "title": "..."}
  ],
  "relatedBlogs": [
    {"slug": "...", "title": "..."},
    {"slug": "...", "title": "..."}
  ]
}
```

### Blogs
```json
{
  "relatedBlogs": [
    {"slug": "...", "title": "..."},
    {"slug": "...", "title": "..."}
  ],
  "relatedProducts": [
    {"slug": "...", "title": "..."},
    {"slug": "...", "title": "..."}
  ]
}
```

---

## ⚙️ Customization

### Change Number of Related Items

Edit `scripts/generate-related-content.js` (lines ~60-65):

```javascript
// For products
data.relatedProducts = getRelatedItems(..., 4);  // Change 4 to desired number
data.relatedBlogs = getRelatedItems(..., 3);    // Change 3 to desired number

// For blogs
data.relatedBlogs = getRelatedItems(..., 3);    // Change 3 to desired number
data.relatedProducts = getRelatedItems(..., 4); // Change 4 to desired number
```

### Adjust Similarity Threshold

Edit `scripts/generate-related-content.js` (line ~35):

```javascript
function getRelatedItems(currentSlug, currentTags, allItems, limit = 3) {
  return allItems
    .filter(item => item.slug !== currentSlug && item.similarity > 0.15) // Add threshold
    // ...
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Script not found | Run from `scripts/` directory |
| No related items showing | Check that items have tags; re-run script |
| Wrong related items | Items may have different tags; this is normal |
| Script errors | Ensure JSON files are valid; check file permissions |

---

## 📈 What Gets Updated

**Products:** 100 files updated
- `data/products/*.json`

**Blogs:** 100 files updated
- `data/blogs/*.json`

**Total:** 200 files with relationship data added

---

## ✅ Verification

After running the script, check:

1. **Product page** - See related products and blogs
2. **Blog page** - See sidebar with related content
3. **JSON files** - Verify `relatedProducts` and `relatedBlogs` arrays exist

Example check:
```bash
# View a product file
cat data/products/organic-jaggery-gur.json | grep -A 5 "relatedProducts"

# View a blog file
cat data/blogs/why-organic-jaggery-is-better-than-refined-sugar.json | grep -A 5 "relatedBlogs"
```

---

## 🎯 Key Features

✅ **Automatic:** No manual configuration needed
✅ **Fast:** Generates relationships in 1-2 seconds
✅ **Smart:** Uses tag-based similarity algorithm
✅ **Scalable:** Works with any number of products/blogs
✅ **Zero Overhead:** Pre-generated data, no runtime cost
✅ **Responsive:** Works on all screen sizes
✅ **User Friendly:** Improves engagement and discovery

---

## 📚 Full Documentation

See `RELATED_CONTENT_GUIDE.md` for:
- Detailed algorithm explanation
- Advanced customization options
- Performance notes
- Future enhancement ideas
- Troubleshooting guide

---

## 💡 Tips

1. **Run after adding new products/blogs** to regenerate relationships
2. **Check console output** to verify all items were processed
3. **Test on different screen sizes** to see responsive layout
4. **Monitor click-through rates** on related items
5. **Adjust tags** to improve relationship quality

---

**Last Updated:** Nov 30, 2025
**Status:** ✅ Production Ready
