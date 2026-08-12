const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicSrc = path.join(root, 'public');
const functionsPublic = path.join(root, 'functions', 'public');

if (!fs.existsSync(functionsPublic)) fs.mkdirSync(functionsPublic, { recursive: true });

const files = ['email_header.jpeg', 'email_footer.jpeg'];
files.forEach((f) => {
  const src = path.join(publicSrc, f);
  const dst = path.join(functionsPublic, f);
  if (!fs.existsSync(src)) {
    console.error('Source missing:', src);
    return;
  }
  fs.copyFileSync(src, dst);
  console.log('Copied', f);
});

console.log('Done.');
