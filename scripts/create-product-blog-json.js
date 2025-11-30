const fs = require('fs');
const path = require('path');

// Read the main data.json file
const dataPath = path.join(__dirname, '..', 'data', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Create directories if they don't exist
const blogsDir = path.join(__dirname, '..', 'data', 'blogs');
const productsDir = path.join(__dirname, '..', 'data', 'products');

if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Helper function to check if an object is empty
function isEmpty(obj) {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
}

// Process each entry
let blogCount = 0;
let productCount = 0;
let skippedBlogs = 0;
let skippedProducts = 0;

data.forEach((entry) => {
  // Process blog
  if (entry.blog && !isEmpty(entry.blog) && entry.blog_slug) {
    const blogFilePath = path.join(blogsDir, `${entry.blog_slug}.json`);
    fs.writeFileSync(
      blogFilePath,
      JSON.stringify(entry.blog, null, 2),
      'utf8'
    );
    blogCount++;
    console.log(`✓ Created blog: ${entry.blog_slug}.json`);
  } else if (entry.blog_slug) {
    skippedBlogs++;
    console.log(`⊘ Skipped blog (empty): ${entry.blog_slug}`);
  }

  // Process product
  if (entry.product && !isEmpty(entry.product) && entry.product_slug) {
    const productFilePath = path.join(productsDir, `${entry.product_slug}.json`);
    fs.writeFileSync(
      productFilePath,
      JSON.stringify(entry.product, null, 2),
      'utf8'
    );
    productCount++;
    console.log(`✓ Created product: ${entry.product_slug}.json`);
  } else if (entry.product_slug) {
    skippedProducts++;
    console.log(`⊘ Skipped product (empty): ${entry.product_slug}`);
  }
});

// Summary
console.log('\n=== Summary ===');
console.log(`Total entries processed: ${data.length}`);
console.log(`Blogs created: ${blogCount}`);
console.log(`Products created: ${productCount}`);
console.log(`Blogs skipped (empty): ${skippedBlogs}`);
console.log(`Products skipped (empty): ${skippedProducts}`);
console.log('\nDone! ✨');

