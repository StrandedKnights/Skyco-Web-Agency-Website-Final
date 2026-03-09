const fs = require('fs');
const path = require('path');

const PROJECTS = [
    {
        name: 'Skyco Website',
        dir: 'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Skyco Website',
        jsPath: 'js/protection.js'
    },
    {
        name: 'Rijschool',
        dir: 'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Rijschool',
        // In Rijschool, we'll put it in js/protection.js as well
        jsPath: 'js/protection.js'
    }
];

function injectScript(filePath, jsRelativePath) {
    if (path.extname(filePath) !== '.html') return;

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Prevent double injection
        if (content.includes('protection.js')) {
            console.log(`Skipping (already injected): ${filePath}`);
            return;
        }

        // We want to inject it before </head>
        const scriptTag = `    <script src="${jsRelativePath}"></script>\n`;

        if (content.includes('</head>')) {
            content = content.replace('</head>', `${scriptTag}</head>`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected protection script into: ${filePath}`);
        } else {
            console.warn(`No </head> tag found in: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
}

function walk(dir, jsRelativePath) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            if (!['node_modules', '.git', 'assets', 'tools', 'img', 'css'].includes(file)) {
                // Adjust relative path for subdirectories (e.g., projects/)
                const deeperPath = '../' + jsRelativePath;
                walk(full, deeperPath);
            }
        } else {
            injectScript(full, jsRelativePath);
        }
    });
}

// 1. First, copy protection.js to Rijschool/js/
const protectionSource = 'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Skyco Website/js/protection.js';
const rijschoolJsDir = 'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Rijschool/js';
if (!fs.existsSync(rijschoolJsDir)) fs.mkdirSync(rijschoolJsDir, { recursive: true });
fs.copyFileSync(protectionSource, path.join(rijschoolJsDir, 'protection.js'));
console.log('Copied protection.js to Rijschool');

// 2. Run injection
PROJECTS.forEach(proj => {
    console.log(`Injecting into ${proj.name}...`);
    walk(proj.dir, proj.jsPath);
});
