const fs = require('fs');
const path = require('path');

// Read all products and blogs
const productsDir = path.join(__dirname, '..', 'data', 'products');
const blogsDir = path.join(__dirname, '..', 'data', 'blogs');

function getFilesFromDir(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        slug: f.replace(/\.json$/, ''),
        path: path.join(dir, f)
      }));
  } catch {
    return [];
  }
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

// Calculate similarity between two tag arrays
function calculateSimilarity(tags1, tags2) {
  if (!tags1 || !tags2) return 0;
  const set1 = new Set(tags1.map(t => t.toLowerCase()));
  const set2 = new Set(tags2.map(t => t.toLowerCase()));
  
  const intersection = [...set1].filter(x => set2.has(x)).length;
  const union = new Set([...set1, ...set2]).size;
  
  return union === 0 ? 0 : intersection / union;
}

// Get related items
function getRelatedItems(currentSlug, currentTags, allItems, limit = 3) {
  return allItems
    .filter(item => item.slug !== currentSlug)
    .map(item => ({
      ...item,
      similarity: calculateSimilarity(currentTags, item.tags)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(({ slug, title, similarity, ...rest }) => ({ slug, title }));
}

// Main process
console.log('🔄 Generating related content...\n');

const productFiles = getFilesFromDir(productsDir);
const blogFiles = getFilesFromDir(blogsDir);

// Load all products and blogs with metadata
const products = productFiles.map(file => {
  const data = loadJson(file.path);
  return {
    slug: file.slug,
    title: data?.title || file.slug,
    tags: data?.tags || [],
    category: data?.category,
    price: data?.price,
    excerpt: data?.excerpt,
    images: data?.images
  };
});

const blogs = blogFiles.map(file => {
  const data = loadJson(file.path);
  return {
    slug: file.slug,
    title: data?.title || file.slug,
    tags: data?.tags || [],
    excerpt: data?.excerpt,
    coverImage: data?.coverImage,
    author: data?.author
  };
});

console.log(`📦 Loaded ${products.length} products`);
console.log(`📝 Loaded ${blogs.length} blogs\n`);

// Generate related products for each product
let productsUpdated = 0;
products.forEach(product => {
  const filePath = path.join(productsDir, `${product.slug}.json`);
  const data = loadJson(filePath);
  
  if (data) {
    data.relatedProducts = getRelatedItems(product.slug, product.tags, products, 4);
    data.relatedBlogs = getRelatedItems(product.slug, product.tags, blogs, 3);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    productsUpdated++;
    console.log(`✓ Updated product: ${product.slug}`);
  }
});

// Generate related blogs for each blog
let blogsUpdated = 0;
blogs.forEach(blog => {
  const filePath = path.join(blogsDir, `${blog.slug}.json`);
  const data = loadJson(filePath);
  
  if (data) {
    data.relatedBlogs = getRelatedItems(blog.slug, blog.tags, blogs, 3);
    data.relatedProducts = getRelatedItems(blog.slug, blog.tags, products, 4);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    blogsUpdated++;
    console.log(`✓ Updated blog: ${blog.slug}`);
  }
});

console.log('\n=== Summary ===');
console.log(`✅ Products updated: ${productsUpdated}`);
console.log(`✅ Blogs updated: ${blogsUpdated}`);
console.log('\n🎉 Done! Related content generated successfully.');
