const fs = require('fs-extra');

const indexPath = './docs/index.html';
const notFoundPath = './docs/404.html';

fs.copy(indexPath, notFoundPath)
    .then(() => console.log('✔ 404.html created from index.html'))
    .catch(err => {
        console.error('❌ Failed to copy index.html to 404.html:', err);
        process.exit(1);
    });
