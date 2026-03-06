// Run this in your browser console to verify requirements
const requiredIds = [
  'doc-content', 'language-switcher', 'sidebar', 'search-input', 
  'version-selector', 'theme-toggle', 'table-of-contents', 
  'feedback-input', 'feedback-submit', 'code-block'
];

requiredIds.forEach(id => {
  const el = document.querySelector(`[data-testid*="${id}"]`);
  console.log(`${id}: ${el ? '✅ Found' : '❌ Missing'}`);
});